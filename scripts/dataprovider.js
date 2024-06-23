// ----------------------------------------------------------------------------------
// DataProvider class
// Responsible for:
// 1 - Retrieve parcel assets from server (parcelslistdata.json)
// 2 - Enrich parcels with geometry info (parceldata.json) and metadata (metadata.json)
// ----------------------------------------------------------------------------------
class DataProvider {
    constructor() {
        this.somniumParcelsContract = '0x913ae503153d9a335398d0785ba60a2d63ddb4e2';
        this.openSeaRoute = '/opensea';
        this.openSeaPageSize = 50;
        this.statusCodes = ['pending', 'data fetched', 'error'];
        this.status = 0;
        this.allSomniumParcelsOpenSea = [];
        this.parcels = [];
        this.parcelOwners = [];
        this.filters = [];
        this.parcelsRefreshed = 0;
        this.progressInterval = Math.floor(this.openSeaPageSize / 5000 * 100);
    }

    //提供给接口使用的language
    getLangForApi = () => {
        const local = String(JSON.parse(localStorage.getItem('locale'))) || 'en-US'
        return local === 'en-US' ? 'en' : local === 'ko-KR' ? 'kr' : 'hk';
    };

    fetchUserLands = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const address = urlParams.get('address') || "0x87461400e1b8a265b8B749326B8afc8CD44ED105";

            const fetchUrl = `${apiBaseUrl}/v2/user/lands?address=${address}&filter=all&orders=false`;

            const response = await fetch(fetchUrl);
            if (response.ok) {
                const landsRes = await response.json();
                const landsList = Array.isArray(landsRes.data) ? landsRes.data : [];
                return landsList.filter((land)=>{
                    return land.status !== 'deal';
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    // request all opensea parcels
    requestAllSomniumParcelsOpenSea() {
        var thisObj = this;

        return new Promise(async (resolve, reject) => {
            const landsList = await thisObj.fetchUserLands() || [];
            // 参考这个数据格式 /data/parcels.json
            fetch(`./data/v2parcels.json`).then(res => res.json()).then(async (pd) => {
                var parcelsOpenSea = pd; // .data
                thisObj.parcelsRefreshed = parcelsOpenSea.refreshed;

                const newParcelsList = parcelsOpenSea.assets.map(item => {
                    const newLands = landsList.length > 0 ? landsList.find(land => Number(land.token_id) === Number(item.token_id)) : {};
                    const typesStatus = {
                        "SSS": "S",
                        "SS": "M",
                        "S": "XL",
                        "A": "A",
                        "B": "B",
                        "C": "C"
                    }[item.parcel_size] || '';

                    return {
                        ...item,
                        newLands: newLands ? newLands : {},
                        parcel_location: typesStatus,
                        parcel_size: typesStatus
                    };
                });

                newParcelsList.forEach(p => {
                    thisObj.parcels.push(p);
                });

                thisObj.fetchGeoInfo().then(function () {
                    thisObj.fetchFilters().then(function () {
                        thisObj.fetchMetaInfo().then(function () {
                            thisObj.status = 1;
                            resolve();
                        }).catch(function (err) {
                            thisObj.status = 2;
                            reject(err);
                        });
                    });
                });

            });
        })
    };

    fetchGeoInfo() {
        return new Promise((resolve, reject) => {
            fetch('/data/parceldata.json').then(res => res.text()).then(pd => {
                var parceldata = JSON.parse(pd);
                parceldata.assets.forEach(p => {
                    var id = p.token_id;
                    var parcelIndex = this.parcels.findIndex((parcel => parcel.token_id == id));
                    //console.log(id);
                    //console.log(parcelIndex);
                    if (parcelIndex >= 0) {
                        // geometry, used by ThreePolygonLayer
                        this.parcels[parcelIndex].geometry = p.geometry;
                        this.parcels[parcelIndex].updated = 1;

                        // x,y coordinate
                        // var x = p.geometry.geometry.coordinates[0][0][0];
                        // var y = p.geometry.geometry.coordinates[0][0][1];
                        // this.parcels[parcelIndex].coordinates.x = x;
                        // this.parcels[parcelIndex].coordinates.y = y;

                        //console.log(this.parcels[parcelIndex]);
                    }
                });
                resolve();
            });
        });
    };

    fetchMetaInfo() {
        return new Promise((resolve, reject) => {
            //fetch('https://raw.githubusercontent.com/marcdemar/somniumexplorer/master/metadata.json').then(res => res.text()).then(md => {
            fetch('/data/metadata.json').then(res => res.text()).then(md => {
                var parceldata = JSON.parse(md);
                var mergedCategories = [];
                parceldata.assets.forEach(p => {
                    var id = p.token_id;
                    var parcelIndex = this.parcels.findIndex((parcel => parcel.token_id == id));
                    if (parcelIndex >= 0) {
                        this.parcels[parcelIndex].metadata.name = p.name;
                        this.parcels[parcelIndex].metadata.description = p.description;
                        this.parcels[parcelIndex].metadata.categories = p.categories;
                        this.parcels[parcelIndex].metadata.tags = p.tags;
                        this.parcels[parcelIndex].metadata.preview_img = p.preview_img;
                        mergedCategories = mergedCategories.concat(p.categories);
                    }
                });
                this.metaCategories = mergedCategories.filter((s, i, array) => array.indexOf(s) === i);
                resolve();
            });
        });
    };

    // Method: fetch filter definitions from server
    fetchFilters() {
        return new Promise((resolve, reject) => {
            fetch('/data/filters.json').then(res => res.text()).then(f => {
                var filters = JSON.parse(f);
                console.log(filters);
                filters.filters.forEach(filter => {
                    this.filters.push(filter);
                });
                resolve();
            });
        });
    };

    enrichSomniumParcels() {

        for (var asset in this.allSomniumParcelsOpenSea) {

            // add derived price
            if (this.allSomniumParcelsOpenSea[asset].sell_orders && this.allSomniumParcelsOpenSea[asset].sell_orders.length > 0) {
                if (this.allSomniumParcelsOpenSea[asset].sell_orders[0].finalized == false) {
                    this.allSomniumParcelsOpenSea[asset].derived_price = this.allSomniumParcelsOpenSea[asset].sell_orders[0].current_price;
                } else {
                    this.allSomniumParcelsOpenSea[asset].derived_price = 0;
                };
            } else {
                this.allSomniumParcelsOpenSea[asset].derived_price = 0;
            };

            // build array with all parcel owners
            console.log(this.allSomniumParcelsOpenSea[asset].owner.address);
            this.parcelOwners.push(this.allSomniumParcelsOpenSea[asset].owner.address);

        };
        var count = {};
        this.parcelOwners.forEach(address => count[address] = (count[address] || 0) + 1);
        for (var asset in this.allSomniumParcelsOpenSea) {
            this.allSomniumParcelsOpenSea[asset].parcel_count = count[this.allSomniumParcelsOpenSea[asset].owner.address];
        };

    };

    sortAssets() {
        this.allSomniumParcelsOpenSea.sort((a, b) => parseFloat(a.derived_price) - parseFloat(b.derived_price));
    };

}
