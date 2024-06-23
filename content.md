for (var asset in this.dataProvider.parcels) {
var currentAsset = this.dataProvider.parcels[asset];
// 找到匹配的数据对象
const newLands = currentAsset.newLands
const landStatus =
Object.keys(newLands).length === 0
? currentAsset.land_state
: newLands.status;
const dayTime = Object.keys(newLands).length === 0 ? "" : newLands;
// console.log('dayTime :>> ', dayTime);
const currentLands =
Object.keys(newLands).length === 0 ? currentAsset : newLands;

                        // some random numbers for pulling images (until there is a solution for pulling somnium images)
                        var i = Math.floor(Math.random() * 500) + 1;
                        var h = 150;

                        var text =
                            currentAsset.parcel_size + " | " + currentAsset.parcel_location;

                        // hover html based on bootstrap card class
                        var hoverInfo =
                            "<div class='card " +
                            this.id +
                            "-item text-center rounded-0 w-20 m-1' token_id='" +
                            currentAsset.token_id +
                            "' style='min-width:150px;max-width:150px;max-height:200px'><div class='view overlay'><img class='card-img-top rounded-0 d-none d-sm-block' src='https://picsum.photos/id/" +
                            i +
                            "/200/" +
                            h +
                            "'><a href=#!'><div class='mask rgba-white-slight'></div></a></div><div class='card-body'><!--h5 class='card-title' style='color:black'>Parcel Info</h5--><p class='card-text' style='color:black'>" +
                            text +
                            "<br/>Price:" +
                            currentAsset.sell_order.price +
                            "</p><a target='new' href='" +
                            currentAsset.permalink +
                            "' class='btn btn-mdb-color btn-sm text-white'>OpenSea</a></div></div>";

                        var newTabName = currentAsset.owner.address;
                        var newTabRoute = "/owner?owner=" + currentAsset.owner.address;

                        var buttonText =
                            currentAsset.sell_order.for_sale == "1" ? "OpenSea" : "OpenSea";
                        // popup html based on bootstrap card class
                        //var popupInfo = "<div class='card " + this.id + "-popup text-center rounded-0' token_id='" + currentAsset.token_id + "' style='min-width:150px;max-width:150px;max-height:250px'><div class='view overlay'><img class='card-img-top rounded-0 d-none d-sm-block' src='https://picsum.photos/id/" + i + "/200/" + h + "'><a href='#!'><div class='mask rgba-white-slight'></div></a></div><div class='card-body'><!--h5 class='card-title' style='color:black'>Parcel Info</h5--><p class='card-text' //style='color:black'>" + text + "<br/>Price:" + currentAsset.sell_order.price + "</p><a target='new' href='" + currentAsset.permalink + "' class='btn btn-mdb-color btn-sm text-white'>OpenSea</a><br/><a _target='new' onclick=navControl.addTab('" + newTabName + "','" + newTabRoute + "',renderLeafletMap) href='#' class='btn btn-mdb-color btn-sm text-white'>Owner</a></div>";
                        var popupInfo =
                            "<div class='card " +
                            this.id +
                            "-popup  card-main text-center rounded-0 m-1' token_id='" +
                            currentAsset.token_id +
                            "' style='min-width:175px;max-width:175px;max-height:325px'><div class='view overlay img-info-card'><a href='#!'><div class='mask rgba-white-slight'></div></a></div><div class='card-body p-2'><!--h5 class='card-title' style='color:black'>Parcel Info</h5--><p class='card-text' style='color:black'>" +
                            text +
                            "<br/>Token ID:" +
                            currentAsset.token_id +
                            "<br/>Sale price:" +
                            currentAsset.sell_order.price +
                            "<br/>Last price:" +
                            currentAsset.last_sale.last_sale_price +
                            "</p><a target='_new' href='https://somniumspace.com/parcel/" +
                            currentAsset.token_id +
                            "' class='btn btn-light btn-sm text-white m-0 p-0'></a><br/><a target='new' href='" +
                            currentAsset.permalink +
                            "?ref=" +
                            this.affiliateAddress +
                            "' class='btn btn-mdb-color btn-sm text-white'>OpenSea</a><br/><a _target='new' onclick=mapTalksMap.otherOwnerAddress='" +
                            currentAsset.owner.address +
                            "';mapTalksMap.initFilter(mapTalksMap.otherOwnerParcels);mapTalksMap.updateThreePolygonLayer(mapTalksMap.otherOwnerParcels); href='#' class='xbtn xbtn-mdb-color btn-sm text-black'>Owner</a><br/><button type='button' class='close close-info-card' aria-label='Close'><span aria-hidden='true'>×</span></button></div>";

                        // 弹窗
                        var popupInfoAlt =
                            "<div class='card card-main m-1 token_id=" + currentAsset.token_id + "'>" +
                            "<div class='view overlay img-info-card'>" +
                            "<div class='card-body'>" +
                            "<div class='card-main-top'>" +
                            "<div class='title'>" +
                            (currentAsset.land_name ? currentAsset.land_name : currentAsset.owner.username) +
                            "<b>: </b>" +
                            currentAsset.parcel_size +
                            "</div>" +
                            "<div class='main-center'>" +
                            "<span>" + (currentAsset.last_sale.last_sale_price ? currentAsset.last_sale.last_sale_price : "0") + " USDC</span>" +
                            "<div class='status'>" +
                            (landStatus && landStatus === landState.OnAuction
                                ? thisObj.changeLanguageInfo("OnAuction", "징 파이 종", "競拍中")
                                : landStatus && landStatus === landState.Earning
                                    ? thisObj.changeLanguageInfo("Earning", "셔우 이 종", "收益中")
                                    : landStatus && landStatus === landState.Normal
                                        ? thisObj.changeLanguageInfo("Normal", "정 창", "正常")
                                        : thisObj.changeLanguageInfo("Unavailable", "뿌 커 용", "不可用")
                            ) +
                            "</div>" +
                            "</div>" +
                            "<div class='bottom' style='display: " + (dayTime ? "block" : "none") + "'>" +
                            (dayTime ? dayTime.duration : "") +
                            (dayTime ? thisObj.changeLanguageInfo("day", "티앤", "天") : "") +
                            (dayTime ? "-" : "") +
                            (thisObj.formatTime(dayTime ? dayTime.order_time : "")) +
                            "</div>" +
                            "</div>" +
                            "<div class='card-main-site'>" +
                            "<div class='left'>" +
                            "<img style='margin-right:5px;height:15px' src='./images/position-icon.svg' alt='' />" +
                            thisObj.changeLanguageInfo("Coordinates", "쭤 뺘오 시", "地理位置") +
                            "<b style='margin-right: 5px'>: </b>" +
                            currentAsset.coordinates.x +
                            "</div>" +

                            "</div>" +
                            "<div class='card-main-yield'>" +
                            "<div class='top-1'>" +
                            "<div class='name'>" + thisObj.changeLanguageInfo("Holder", "츠 요우 저", "持有者") + "</div>" +
                            "<span>" + (currentAsset.owner.address ? useAddressMemo(currentAsset.owner.address, 8) : thisObj.changeLanguageInfo("Not", "짠 우", "暫無")) + "</span>" +
                            "</div>" +
                            "<div class='top-1'>" +
                            "<div class='name'>" + thisObj.changeLanguageInfo("Recovery rate", "셔우 스 솨이", "收謚率") + "</div>" +
                            "<span>" + (currentLands.interest_rate ? currentLands.interest_rate + "%" : "0") + "</span>" +
                            "</div>" +
                            "<div class='top-1'>" +
                            "<div class='name'>" + thisObj.changeLanguageInfo("Earnings", "셔우 이", "收謚") + " </div>" +
                            "<span>" + (currentLands.interest ? Number(currentLands.interest).toFixed(3) : "0") + " USDC</span>" +
                            "</div>" +
                            "</div>" +
                            "<div class='card-main-token-id'>" +
                            "<div class='left'>" +
                            "<div class='title'>" + thisObj.changeLanguageInfo("Blockchain", "취 콰이 리앤", "區塊鏈") + "</div>" +
                            "<div class='info'>" + "Ethereum" + "</div>" +
                            "</div>" +
                            "<div class='center'>" +
                            "<div class='title'>" + thisObj.changeLanguageInfo("Size", "따 샤오", "大小") + "</div>" +
                            "<div class='info'>" + (currentAsset.parcel_size_m ? currentAsset.parcel_size_m : thisObj.changeLanguageInfo("Not", "짠 우", "暫無")) + "</div>" +
                            "</div>" +
                            "<div class='right'>" +
                            "<div class='title'>Token ID</div>" +
                            "<div class='info'>" + (currentAsset.token_id ? currentAsset.token_id : thisObj.changeLanguageInfo("Not", "짠 우", "暫無")) + "</div>" +
                            "</div>" +
                            "</div>" +
                            "<div class='land-desc'>" +
                            "<div class='title'>" + thisObj.changeLanguageInfo("What I can do with the land ?", "워 커 이 용 투 띠 쭤 션 me ?", "我可以用土地做什麽 ?") +
                            "</div>" +
                            "<div class='info'>" +
                            "<b class='dian'>.</b>" +
                            thisObj.changeLanguageInfo("Earn Special Rewards", "주안 취 터 삐에 지앙 리", "賺取特別獎勵") +
                            "</div>" +
                            "<div class='info'>" +
                            "<b class='dian'>.</b>" +
                            thisObj.changeLanguageInfo("Exclusive pledges for MetalLand holders", "츠 요우 저 뚜 지아 즈야", "MetalLand持有者獨家質押") +
                            "</div>" +
                            "<div class='info'>" +
                            "<b class='dian'>.</b>" +
                            thisObj.changeLanguageInfo("Sell your land and earn revenue", "추 셔우 닌 de 투 띠 ， 주안 취 셔우이", "出售您的土地，賺取收益") +
                            "</div>" +
                            "<div class='info'>" +
                            "<b class='dian'>.</b>" +
                            thisObj.changeLanguageInfo("Publish and monetize your creations", "파 뿌 삥 후어 삐 후아 닌 쭤 핀", "發布並貨幣化您的作品") +
                            "</div>" +
                            "</div>" +
                            "<div class='_is_' style='display: " + (landStatus && landStatus === landState.OnAuction ? "block" : "none") + "'>" +
                            "<div onclick='handleRulesBtn()' class='card-main-land-rules'>" + thisObj.changeLanguageInfo("Rules", "꿰이 쩌", "規 則") + "</div>" +
                            "<div class='land-btn' onclick='handleAuctionBtn()'>" + thisObj.changeLanguageInfo("Bidding", "징 파이", "競 拍") + "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>";


                        if (currentAsset.metadata.name != "") {
                            var parcelTitle = currentAsset.metadata.name;
                        } else {
                            var parcelTitle = "Parcel #" + currentAsset.token_id.toString();
                        }

                        if (currentAsset.metadata.preview_img != "") {
                            var previewImg = currentAsset.metadata.preview_img;
                        } else {
                            var previewImg = currentAsset.image_preview_url;
                        }
                        var parcelInfoCard =
                            "<!-- Card --><div class='card'><!-- Card image --><div onclick=mapTalksMap.changeView(" +
                            currentAsset.index +
                            "); class='view overlay'><img class='card-img-top' src='" +
                            previewImg +
                            "' alt='Card image cap'><a href='#!'><div class='mask rgba-white-slight'></div></a></div><!-- Card content -->  <div class='card-body'><!-- Title --><h6 style='cursor:pointer' onclick=mapTalksMap.changeView(" +
                            currentAsset.index +
                            "); class='card-title'>" +
                            parcelTitle +
                            "</h6><!-- Text --><p class='card-text'>" +
                            currentAsset.metadata.description +
                            "</p><!-- Button --><!--a href='#' class='btn btn-primary'>Button</a--></div></div><!-- Card -->";
                        //var popupInfoAlt = "<nft-card contractAddress='0x913ae503153d9a335398d0785ba60a2d63ddb4e2' tokenId='" + currentAsset.token_id + "'> </nft-card><br/><a _target='new' onclick=mapTalksMap.pinParcel(" + currentAsset.index + "); href='#' class='xbtn xbtn-mdb-color btn-sm text-black'>Pin parcel</a>"

                        //var popupInfoAlt = "<div class='card card-image' style='width:500px;background-image: url(" + currentAsset.image_preview_url + ");'><div class='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4'><div><h5 class='pink-text'><i class='fas fa-chart-pie'></i> Marketing</h5><h3 class='card-title pt-2'><strong>This is the card title</strong></h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!.</p><a class='btn btn-pink'><i class='fas fa-clone left'></i> View project</a></div></div></div>";
                        // well, hover info html is actually concatenated in one html string for displaying in one scrollable DIV

                        this.hoverInfoHtml += hoverInfo;
                        // var popupInfoAlt = this.isMobileFn() ? popupInfoAltMobile : popupInfoAltPc

                        this.popupInfos.push(popupInfo);
                        this.popupInfosAlt.push(popupInfoAlt);
                        this.parcelInfoCards.push(parcelInfoCard);
                    }

  <br/>

  <!-- Default inline 1  filterParcelbySize -->
   <div class="custom-control custom-checkbox custom-control-inline">
     <input checked type="checkbox" class="custom-control-input" value='SSS' id="parcelSizeSSS">
     <label class="custom-control-label white-text" for="parcelSizeSSS">SSS</label>
   </div>
   <!-- Default inline 2  filterParcelbySize -->
   <div class="custom-control custom-checkbox custom-control-inline">
     <input checked type="checkbox" class="custom-control-input" value='SS' id="parcelSizeSS">
     <label class="custom-control-label white-text" for="parcelSizeSS">SS</label>
   </div>
   <!-- Default inline 3  filterParcelbySize -->
   <div class="custom-control custom-checkbox custom-control-inline">
     <input checked type="checkbox" class="custom-control-input" value='S' id="parcelSizeS">
     <label class="custom-control-label white-text" for="parcelSizeS">S</label>
   </div>
   <!-- Default inline 4  filterParcelbySize -->
   <div class="custom-control custom-checkbox custom-control-inline">
     <input checked type="checkbox" class="custom-control-input" value='A' id="parcelSizeA">
     <label class="custom-control-label white-text" for="parcelSizeA">A</label>
   </div>
   <!-- Default inline 5  filterParcelbySize -->
   <div class="custom-control custom-checkbox custom-control-inline">
     <input checked type="checkbox" class="custom-control-input" value='B' id="parcelSizeB">
     <label class="custom-control-label white-text" for="parcelSizeB">B</label>
   </div>
   <!-- Default inline 6  filterParcelbySize -->
   <div class="custom-control custom-checkbox custom-control-inline">
     <input checked type="checkbox" class="custom-control-input" value='C' id="parcelSizeC">
     <label class="custom-control-label white-text" for="parcelSizeC">C</label>
   </div>

  <!-- Default inline 1-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='waterfront' id="waterfront">
    <label class="custom-control-label white-text" for="waterfront">waterfront</label>
  </div>

  <!-- Default inline 2-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='roadside' id="roadside">
    <label class="custom-control-label white-text" for="roadside">roadside</label>
  </div>

  <!-- Default inline 3-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='Land' id="inland">
    <label class="custom-control-label white-text" for="inland">Land</label>
  </div>

  </br>

  <!-- Default inline 1-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='ETH' id="ETH">
    <label class="custom-control-label white-text" for="ETH">eth</label>
  </div>

  <!-- Default inline 2-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='WETH' id="WETH">
    <label class="custom-control-label white-text" for="WETH">weth</label>
  </div

  <!-- Default inline 3-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='DAI' id="DAI">
    <label class="custom-control-label white-text" for="DAI">dai</label>
  </div>

  <!-- Default inline 4-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='CUBE' id="CUBE">
    <label class="custom-control-label white-text" for="CUBE">cube</label>
  </div>

  <!-- Default inline 1-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='SSS' id="SSS">
    <label class="custom-control-label white-text" for="SSS">SSS</label>
  </div>

  <!-- Default inline 2-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='SS' id="SS">
    <label class="custom-control-label white-text" for="SS">SS</label>
  </div>

  <!-- Default inline 3-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='S' id="S">
    <label class="custom-control-label white-text" for="S">S</label>
  </div>

  <!-- Default inline 4-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='A' id="A">
    <label class="custom-control-label white-text" for="A">A</label>
  </div>

  <!-- Default inline 5-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='B' id="B">
    <label class="custom-control-label white-text" for="B">B</label>
  </div>

  <!-- Default inline 6-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbyLocation" value='C' id="C">
    <label class="custom-control-label white-text" for="C">C</label>
  </div>

  <br />

  <!-- Default inline 1-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='SSS' id="SSS">
    <label class="custom-control-label white-text" for="SSS">SSS</label>
  </div>

  <!-- Default inline 2-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='SS' id="SS">
    <label class="custom-control-label white-text" for="SS">SS</label>
  </div

  <!-- Default inline 3-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='S' id="S">
    <label class="custom-control-label white-text" for="S">S</label>
  </div>

  <!-- Default inline 4-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='A' id="A">
    <label class="custom-control-label white-text" for="A">A</label>
  </div>

  <!-- Default inline 5-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='B' id="B">
    <label class="custom-control-label white-text" for="B">B</label>
  </div>

  <!-- Default inline 6-->
  <div class="custom-control custom-checkbox custom-control-inline">
    <input checked type="checkbox" class="custom-control-input filterParcelbySymbol" value='C' id="C">
    <label class="custom-control-label white-text" for="C">C</label>
  </div>

  <br />
