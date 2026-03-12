// warning ： .shopify-payment-button 字符串被用于替换做兼容

(function () {
    let shopId = "";
    if (ShopifyAnalytics.lib == null || ShopifyAnalytics.lib == "" || ShopifyAnalytics.lib == undefined) {
        shopId = JSON.parse(document.querySelectorAll("#shopify-features")[0].outerText).shopId
    } else {
        shopId = ShopifyAnalytics.lib.config.Trekkie.defaultAttributes.shopId
    }


    if (Shopify.theme.id === 120385306678 &&
        shopId === 6722715711 &&
        location.href.indexOf('search') !== -1) {
        document.querySelectorAll('.product-block .content_price').forEach(i =>
            i.style.display = 'none')
    }


    //不在产品页面则推出
    if (window.ShopifyAnalytics.meta.page.pageType !== "product") {
        return;
    }
    let debug = false;
    //当前被选中的variant
    let currentVariant = JSON.parse(document.querySelector('#quote_product_selected_or_first_available_variant').textContent);
    // let productRid = currentVariant.featured_image.product_id;
    let productRid = JSON.parse(document.querySelector('#quote_product_current_id').textContent);
    //所有variant
    let variantData = JSON.parse(document.querySelector('#quote_product_variants').textContent);
    // debug && console.log(currentVariant);
    //当前被选中的变体Id
    let selectVariantId = currentVariant.id;

    // API接口部分URL  【测试服】
    let baseUrl = 'http://quoteapi.sealapps.com/';
    // 获取shopId

    //店铺产品图片链接
    let productImg;
    // debug && console.log("怎么回事");
    const isQuoteProduct = checkQuoteProduct();
    if (!isQuoteProduct) {
        return;
    }
    // debug && console.log("我不知道啊");
    //请求后端获取按钮及form表单的样式地址
    let buttonStyleUrl = 'getBtnFormStyle';
    let btnValue = "";
    let btnColor = "#333333";
    let btnHoverColor = "#444444";
    let btnHoverBorder = '';
    let btnFontColor = "#ffffff";
    let btnBorder = '1px solid transparent';
    let btnFontSize = "";
    let btnHeight = "";
    let btnWidth = "";
    let btnFontWeight = '';
    let formLabelName = "";
    let formPlaceholdName = "";
    let formName = "";
    let formLabelEmail = "";
    let formPlaceholdEmail = "";
    let formEmail = "";
    let formLabelMessage = "";
    let formPlaceholdMessage = "";
    let formMessage = "";
    let formTitle = "";
    let submitText = "";
    let thankTitle = "";
    let thankContent = "";
    let thankContinue = "";
    // 当前变体的信息
    //自适应按钮样式
    let btnRadius = "";
    let btnMargin = "";
    //app是否开启状态，默认开启
    let enable = 0;
    // app是否已经进行了match by theme
    let adaptiveStatus = 0;
    let price = 0;
    let addCart = 0;
    let buyNow = 0;
    let requestQuote = 0;
    let customizeStatus = 0;
    //可以隐藏的3个元素
    let priceEls;
    let addToCartEls;
    let buyNowEls;
    //挂载form表单
    let quoteElement = '';
    // quote-block元素
    let quoteBlockElement;
    // Thank you
    let quoteTyElement;
    //form表单的submit按钮
    let formSubmitBtn;
    //form表单的关闭按钮
    let formShutBtn;
    //quote按钮
    let quoteBtn;
    //关闭quote按钮
    let quoteBlockShutBtn;
    //关闭ty按钮
    let quoteTyShutBtn;
    // 提交按钮
    let quoteSubmitBtn;
    let quoteSubmitSpinner;
    //continueShopping按钮
    let continueShoppingBtn;
    // Soldout按钮
    let soldOutBtn;
    //几个选项的输入框
    let inputName;
    let inputEmail;
    let inputMessage;
    //几个选项的父元素
    let nameDiv;
    let emailDiv;
    let messageDiv;
    //保存action判断为true的表单
    let trueForms = [];
    let exactForm;
    // 保存商家userEmail的邮箱
    let merchantEmail;


    // 缓存下来的邮件以及姓名
    let localCustomerEmail;
    let localCustomerName;

    let payment_button_class = ".shopify-payment-button";
    let shopify_payment_button_parent = null; //这个为空则退出
    let shopify_payment_button = null; //这个可能为空
    let formAction = 'https://' + document.domain + '/cart/add'

    let customInsertSelector = ''
    let customStyle = ''

    if (shopId) {
        switch (shopId) {
            case 6722715711: {
                customInsertSelector = '.more_info_block'
            }
        }
    }

    isExistParentAndUpdateElement();

    //获取店铺按钮样式
    function getBtnStyle(btn) {
        // debug && console.log(btn);
        if (btn.tagName == "DIV") {
            btn = btn.querySelector("button");
        }
        let btnStyle = window.getComputedStyle(btn, null);
        if (btnStyle.width == "auto" || !btnStyle.width) {
            btnWidth = '';
        } else {
            btnWidth = btnStyle.width;
        }
        if (btnStyle.height == "auto" || !btnStyle.height) {
            btnHeight = '';
        } else {
            btnHeight = btnStyle.height;
        }
        btnRadius = btnStyle.borderRadius;
        btnFontColor = RGBtoHex(btnStyle.color);
        //   debug && console.log(btnStyle.backgroundColor);
        //   debug && console.log(btn.style.backgroundColor)
        if (btnStyle.backgroundColor == 'rgba(0, 0, 0, 0)' && btn.style.backgroundColor == '') {
            btnColor = 'transparent';
            btnHoverColor = 'transparent';
            btnHoverBorder = '4px';
        } else {
            btnColor = RGBtoHex(btnStyle.backgroundColor);
            btnHoverColor = hexToRgba(btnColor).rgbaHover;
        }
        // debug && console.log(btnColor)
        btnFontSize = btnStyle.fontSize;
        btnMargin = btnStyle.margin;
        btnBorder = btnStyle.border;
        btnFontWeight = btnStyle.fontWeight;
        // debug && console.log(btnRadius);
        // debug && console.log(btnFontSize);
        // debug && console.log(btnFontColor);
        // debug && console.log(btnHeight);
    }

    //获取soldout按钮以及样式
    function getBtnForStyle(trueForm) {
        let btnArr = trueForm.querySelectorAll("button");
        let iptArr = [...trueForm.querySelectorAll("input[type='submit']"), ...trueForm.querySelectorAll("input[type='button']")]
        let allArr = [...btnArr, ...iptArr];
        // debug && console.log(allArr);
        if (allArr.length) {
            for (let i = 0; i < allArr.length; i++) {
                if (allArr[i].type == "submit" && allArr[i].name == "add") {
                    soldOutBtn = allArr[i];
                    // debug && console.log(soldOutBtn);
                    break;
                }
            }
            if (!soldOutBtn) {
                for (let i = 0; i < allArr.length; i++) {
                    if (allArr[i].type == "submit") {
                        soldOutBtn = allArr[i];
                        break;
                    }
                }
            }
            if (!soldOutBtn) {
                for (let i = 0; i < allArr.length; i++) {
                    if (allArr[i].disabled) {
                        soldOutBtn = allArr[i];
                        break;
                    }
                }
            }
            if (!soldOutBtn) {
                soldOutBtn = allArr[0];
            }
        }
        if (soldOutBtn) {
            getBtnStyle(soldOutBtn);
        }
        // debug && console.log(soldOutBtn);
    }

    function getSubmitButton(trueForm) {
        let iptSubArr = trueForm.querySelectorAll("input[type='submit']");
        // debug && console.log("类型为submit的input是");
        // debug && console.log(iptSubArr);
        //如果存在input的类型为submit，则将该按钮数组里第一个直接赋给shopify_payment_button，并结束循环
        if (iptSubArr.length != 0) {
            shopify_payment_button = iptSubArr[0];
            return;
        }
        //如果不存在input的类型为submit，则获取form下的所有按钮进行遍历
        let btnArr = trueForm.querySelectorAll("button");
        // debug && console.log('所有的按钮是');
        // debug && console.log(btnArr);
        for (let j = 0; j < btnArr.length; j++) {
            // debug && console.log("该按钮是");
            // debug && console.log(btnArr[j]);
            if (btnArr[j].type == "submit") {
                // debug && console.log("submit按钮是");
                // debug && console.log(btnArr[j]);
                //如果有类型为submit的按钮，直接将该按钮赋给shopify_payment_button，并结束循环
                shopify_payment_button = btnArr[j];
                break;
            }
        }
    }

    function isExistParentAndUpdateElement() {
        //首先获取所有的form，并进行遍历
        let forms = document.querySelectorAll("form");
        for (let i = 0; i < forms.length; i++) {
            //如果当前表单的action与预测的formAction相同，则推入trueForms数组
            if (forms[i].action == formAction) {
                trueForms.push(forms[i])
            }
        }
        // debug && console.log("符合action的表单是");
        // debug && console.log(trueForms);
        //如果只有一个form表单的action与预期的相同，则一定为要添加按钮的form
        if (trueForms.length == 1) {
            shopify_payment_button = trueForms[0].querySelector(payment_button_class);
            exactForm = trueForms[0];
            if (!shopify_payment_button) {
                getSubmitButton(trueForms[0]);
            }
            getBtnForStyle(trueForms[0]);

        } else {
            //对遍历得出的action符合预期的form数组再次进行循环
            for (let i = 0; i < trueForms.length; i++) {
                if (soldOutBtn) {
                    break;
                }
                let formStyle = window.getComputedStyle(trueForms[i], null);
                //如果form不显示的话，直接中断本次循环，继续遍历之后的form表单
                if (formStyle.visibility != "visible" || formStyle.display == "none" || formStyle.height == 0 || formStyle.width == 0) {
                    continue;
                }
                exactForm = trueForms[i];
                // debug && console.log("第"+ i +"次查询，表单为");
                // debug && console.log(trueForms[i]);
                getBtnForStyle(trueForms[i]);
                // 有可能在第一次内层btnArr循环的时候已经取得了shopify_payment_button，要考虑父级是否有正常显示。
                if (shopify_payment_button) {
                    let parent = shopify_payment_button.parentElement;
                    let parentStyle = window.getComputedStyle(parent, null);
                    //如果父级正常的话就结束trueForms循环
                    if (parentStyle.visibility == "visible" && parentStyle.display != "none" && parentStyle.height != 0 && parentStyle.width != 0) {
                        break;
                    }
                }
                //在该form中寻找是否存在shopify payment button，有的话结束循环，没有的话开始遍历所有按钮寻找对的按钮
                shopify_payment_button = trueForms[i].querySelector(payment_button_class);
                // debug && console.log("shopify payment按钮是：");
                // debug && console.log(shopify_payment_button);
                if (shopify_payment_button) {
                    break;
                } else {
                    let iptSubArr = trueForms[i].querySelectorAll("input[type='submit']");
                    // debug && console.log("类型为submit的input是");
                    // debug && console.log(iptSubArr);
                    //如果存在input的类型为submit，则将该按钮数组里第一个直接赋给shopify_payment_button，并结束循环
                    if (iptSubArr.length != 0) {
                        shopify_payment_button = iptSubArr[0];
                        break;
                    }
                    //如果不存在input的类型为submit，则获取form下的所有按钮进行遍历
                    let btnArr = trueForms[i].querySelectorAll("button");
                    // debug && console.log('所有的按钮是');
                    // debug && console.log( btnArr);
                    for (let j = 0; j < btnArr.length; j++) {
                        // debug && console.log("该按钮是");
                        // debug && console.log(btnArr[j]);
                        if (btnArr[j].type == "submit") {
                            // debug && console.log("submit按钮是" );
                            // debug && console.log(btnArr[j]);
                            //如果有类型为submit的按钮，直接将该按钮赋给shopify_payment_button，并结束循环
                            shopify_payment_button = btnArr[j];
                            //注意，这里的break只是中断了当前的循环，外层循环还会继续。
                            break;
                        }
                    }
                }
            }

            //不管有多少form表单，现在都已经获得完了shopify_payment_button，可以给它添加父级了
            // debug && console.log("现在对form操作结束，得到的submit按钮是");
            // debug && console.log(shopify_payment_button);
            if (shopify_payment_button && shopify_payment_button.parentElement) {
                shopify_payment_button_parent = shopify_payment_button.parentElement;
            }
        }

    }

    //如果获取form的方式获取不到按钮的话，用以前的方法再试一次
    if (!soldOutBtn && !exactForm && !shopify_payment_button) {
        oldIsExistParentAndUpdateElement();
    }

    function oldIsExistParentAndUpdateElement() {
        //payment-button
        shopify_payment_button = document.querySelector(payment_button_class);
        if (shopify_payment_button == null) {
            let btnArr = document.querySelectorAll("button");
            for (let i = 0; i < btnArr.length; i++) {
                if (btnArr[i].getAttribute('type') === "submit" && btnArr[i].getAttribute('name') === "add") {
                    soldOutBtn = btnArr[i];
                    shopify_payment_button_parent = btnArr[i].parentElement;
                    break;
                }
            }
            if (!shopify_payment_button_parent) {
                // debug && console.log('xixi');
                // debug && console.log(btnArr)
                for (let i = 0; i < btnArr.length; i++) {
                    // debug && console.log('Loop');
                    if (btnArr[i].getAttribute('type') === "submit" || btnArr[i].classList.contains("button-secondary")) {
                        soldOutBtn = btnArr[i];
                        shopify_payment_button_parent = btnArr[i].parentElement;
                        break;
                    }
                }
                // debug && console.log(shopify_payment_button_parent);
            }
        } else {
            shopify_payment_button_parent = document.querySelector(payment_button_class).parentElement;
        }
        if (shopify_payment_button != null && !btnWidth) {
            soldOutBtn = shopify_payment_button;
        }
    }

    //找不到挂载元素的地方，就退出
    if (soldOutBtn == null && !exactForm) {
        return;
    } else {
        //有parent，如果是flex布局且它的wrap是nowrap且它direction是row的话，按钮可能会溢出容器。
        // debug && console.log(soldOutBtn);
        if (soldOutBtn) {
            let parentStyle = window.getComputedStyle(soldOutBtn.parentElement, null);
            if (parentStyle.display == "flex" && parentStyle.flexDirection == "row" && parentStyle.flexWrap == "nowrap") {
                soldOutBtn.parentElement.style.flexWrap = "wrap";
            }
            getBtnStyle(soldOutBtn);
        }
        let v1 = variantData[0];
        let productTitle = '';
        if (v1.public_title == null) {
            productTitle = v1.name;
        } else {
            if ((v1.public_title.length - 3) > 0) {
                productTitle = v1.name.substr(0, v1.name.length - v1.public_title.length - 3);
            } else {
                productTitle = productTitle = v1.name;
            }
        }
        //获取按钮样式及店铺状态开关
        getButtonStyle(shopId, buttonStyleUrl);

        if (!enable) {
            return;
        } else {
            handleHide();
        }
        //注入样式
        let mountElement = `<div id="product-restore-quote" style="margin-top: 10px;">
                                <button type="button" class="easy-quote-button" style="text-align:center;margin-top:0; width:${btnWidth} ; height: ${btnHeight}; border-radius: ${btnRadius} ; font-size: ${btnFontSize};margin: ${btnMargin}; font-weight: ${btnFontWeight}; border:${btnBorder ? btnBorder : '1px solid #eee'};">
                                    ${btnValue}
                                </button> 
                            </div>`
        // Mark 嵌入询盘按钮
        if (soldOutBtn) {
            if (customInsertSelector !== '') {
                document.querySelector(customInsertSelector).insertAdjacentHTML('beforebegin', mountElement);
            } else {
                soldOutBtn.insertAdjacentHTML('afterend', mountElement);
            }
            soldOutBtn.parentNode.style.display = "";
            soldOutBtn.parentNode.parentNode.style.display = "";
        } else {
            exactForm.insertAdjacentHTML('beforeend', mountElement);
        }
        if (requestQuote != 1) {
            handleShowClick();
        }
    }
    // 有的情况下按钮背景和文字的颜色相同的话会看不到文字
    function checkFontVisibility(bgc, fontColor) {
        if (bgc === fontColor) {
            return false;
        }
        if (bgc === 'transparent' && fontColor.toUpperCase() === '#FFFFFF') {
            return false;
        }
        return true;
    }
    //请求后端按钮样式及店铺设置接口
    function getButtonStyle(shopId, btnurl) {
        // debug && console.log(shopId);
        // 传递的参数
        let params = {
            shopId: shopId
        };
        // 获取xmlHttpRequest对象
        let xmlHttp = new XMLHttpRequest();
        // API路由
        let url = baseUrl + 'api/v1/script/' + btnurl;
        // post请求方式
        xmlHttp.open('POST', url, false);
        // 添加http头，发送信息至服务器时的内容编码类型
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        // 发送数据，请求体数据
        xmlHttp.send(JSON.stringify(params));
        //从服务器上获取数据
        let dataJson = JSON.parse(xmlHttp.responseText);
        // debug && console.log(dataJson);
        if (dataJson.data != null && dataJson.code == 200) {
            //form表单配置
            let formData = dataJson.data.form;
            //general配置
            let generalData = dataJson.data.general;
            //店铺设置
            enable = generalData.enable;
            price = generalData.price;
            addCart = generalData.add_cart;
            buyNow = generalData.buy_now;
            customizeStatus = generalData.customize_status;
            requestQuote = generalData.request_quote;
            merchantEmail = formData.user_email;
            adaptiveStatus = generalData.adaptive;
            if (!adaptiveStatus) {
                handleMatchByTheme(shopId);
            }
            //判断样式是否是自定义，是的话就覆盖掉适配部分的设置。
            if (customizeStatus == 1) {
                btnColor = generalData.button_color;
                btnFontColor = generalData.font_color;
                btnFontSize = generalData.font_size + 'px';
                btnHeight = generalData.button_height + 'px';
                btnWidth = generalData.button_width + 'px';
                // debug && console.log(hexToRgba(btnColor, 1));
                btnHoverColor = hexToRgba(btnColor, 1).rgbaHover;
                btnBorder = '1px solid transparent';
            }
            btnValue = generalData.button_value;
            formLabelName = formData.name_label;
            formPlaceholdName = formData.name_placeholder;
            formName = formData.name;
            formLabelEmail = formData.email_label;
            formPlaceholdEmail = formData.email_placeholder;
            formEmail = formData.email;
            formLabelMessage = formData.message_label;
            formPlaceholdMessage = formData.message_placeholder;
            formMessage = formData.message;
            formTitle = formData.form_title;
            submitText = formData.submit_value;
            thankTitle = formData.thank_title;
            thankContent = formData.thank_content;
            thankContinue = formData.thank_button;
            if (btnColor == "transparent") {
                btnBorder = '1px solid #ddd';
            }
            importStyles();
        }

    }


    //刷新页面
    let setTimeoutHandle = null;
    reloadProductPage();

    // 检测是否有缓存下来的localStorage名字
    function checkLocalStorage() {
        if (localStorage?.customerName) {
            inputName.value = localStorage.customerName;
        }
        if (localStorage?.customerEmail) {
            inputEmail.value = localStorage.customerEmail;
        }
    }
    function reloadProductPage() {
        //TODO 以后可能会考虑监听Url的方法
        if (window.location.href.indexOf('variant=') !== -1) {
            clearTimeout(setTimeoutHandle);

            let window_url_variant = (Number)(window.location.href.split('variant=')[1]);
            if (selectVariantId !== window_url_variant) {
                // debug && console.log("reloadProductPage selectedVariantId", window_url_variant);
                selectVariantId = window_url_variant;
                for (let i = 0; i < variantData.length; i++) {
                    if (variantData[i].id === selectVariantId) {
                        currentVariant = variantData[i];
                        break;
                    }
                }
                createQuoteButton();
            }
        }

        setTimeoutHandle = setTimeout(() => {
            reloadProductPage();
        }, 50);

    }


    // 查询店铺启动按钮的状态
    function createQuoteButton() {
        if (buttonSwitch === 0) { //还未成功请求服务器
            //url后缀
            let urlSuffix = 'selBtnStatus';

            // 传递的参数
            let params = {
                shopId: shopId
            };

            // 请求后端接口
            httpRequest(urlSuffix, params);
            clearTimeout(setTimeoutHandle);
        }
        initQuoteElement();
    }

    // 检查该产品是否是quote产品
    // async function checkQuoteProduct() {
    //     let url = baseUrl + 'api/v1/script/checkQuoteProduct';
    //     let params = {
    //         shopId: shopId,
    //         productRid: productRid,
    //       };
    //       debug && console.log(params);
    //       // 获取xmlHttpRequest对象
    //       let xmlHttp = new XMLHttpRequest();
    //       // API路由
    //       // post请求方式
    //       xmlHttp.open('POST', url, false);
    //       // 添加http头，发送信息至服务器时的内容编码类型
    //       xmlHttp.setRequestHeader('Content-Type', 'application/json');
    //       // 发送数据，请求体数据
    //       xmlHttp.send(JSON.stringify(params));
    //       //从服务器上获取数据
    //       let res = JSON.parse(xmlHttp.responseText);
    //       debug && console.log(res);
    //       if(res.data == 1){
    //         quoteBtn.style.display = "flex";
    //           return true
    //       } else{
    //           return false
    //       }

    // }
    // 检查该产品是否是quote产品
    function checkQuoteProduct() {
        const params = {
            shopId,
            productRid
        }
        // 获取xmlHttpRequest对象
        let xmlHttp = new XMLHttpRequest();
        // API路由
        const url = baseUrl + 'api/v1/script/checkQuoteProduct';
        // post请求方式
        xmlHttp.open('POST', url, false);
        // 添加http头，发送信息至服务器时的内容编码类型
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        // 发送数据，请求体数据
        xmlHttp.send(JSON.stringify(params));
        //从服务器上获取数据
        const result = JSON.parse(xmlHttp.responseText);
        if (result.code === 200) {
            productImg = result.data.imageUrl;
            debug && console.log(result.data);
            return result.data.isQuote;
        } else {
            return 0;
        }
        // if (result.data.isQuote == 1){
        //     quoteBtn.style.display = "flex";
        //     if(enable){
        //         handleHide();
        //     }
        // } else {
        //     isQuoteProduct = false;
        // }
    }

    async function submitQuote(name, email, message, merchantEmail) {
        let url = baseUrl + 'api/v1/script/customerQuoteMessage';
        let params = {
            shopId: shopId,
            productRid: productRid,
            variantRid: currentVariant.id,
            sku: currentVariant.sku,
            options: currentVariant.options,
            name: name,
            email: email,
            message: message,
            userEmail: merchantEmail,
        }
        // debug && console.log(params);
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(params)
        })
        // debug && console.log(res);
        let result = await res.json();
        // debug && console.log(result);
        if (res.ok != false) {
            localStorage.customerEmail = email;
            localStorage.customerName = name;
            quoteBlockElement.style.display = "none";
            quoteTyElement.style.display = "flex";
        } else {
            quoteSubmitBtn.innerHTML = submitText;
        }
    }

    //点击quote按钮后展示quote表单。之所以不放在handleEvent里是因为渲染表单是在点击按钮之后进行的，因此不能其它事件此时还不能绑定（比如submit按钮）
    function handleShowClick() {
        quoteBtn = document.querySelector("#product-restore-quote");
        if (requestQuote == 1) {
            quoteBtn.style.display = "none"
            return;
        } else {
            quoteBtn.style.display = "flex"
        }
        quoteBtn.addEventListener('click', function () {
            renderForm();
            quoteElement.style.display = "block";
            quoteBlockElement.style.display = "flex";
        })
        // checkQuoteProduct();
    }

    //给按钮都绑上事件
    function handleEvent() {
        quoteElement = document.querySelector("#product-quote");
        quoteBlockElement = quoteElement.querySelector(".quote-block");
        quoteTyElement = quoteElement.querySelector(".quote-ty");
        inputName = quoteBlockElement.querySelector(".quote-info-name input");
        inputEmail = quoteBlockElement.querySelector(".quote-info-email input");
        inputMessage = quoteBlockElement.querySelector(".quote-info-message textarea");
        nameDiv = quoteBlockElement.querySelector(".quote-info-name");
        emailDiv = quoteBlockElement.querySelector(".quote-info-email");
        continueShoppingBtn = quoteTyElement.querySelector(".quote-finish-btn");
        messageDiv = quoteBlockElement.querySelector(".quote-info-message");
        emailError = document.querySelector(".input-email-error");
        messageError = document.querySelector(".input-message-error");
        checkLocalStorage();
        //inputEmail框失焦时检测地址合法性
        inputEmail.addEventListener('blur', function (e) {
            // debug && console.log(emailError);
            // debug && console.log(e.target.value);
            // debug && console.log(checkEmailAddress(e.target.value));
            if (!checkEmailAddress(e.target.value)) {
                emailError.style.display = 'flex';
            } else {
                emailError.style.display = 'none';
            }
        })

        inputMessage.addEventListener('blur', function (e) {
            if (!e.target.value) {
                messageError.style.display = 'block';
            } else {
                messageError.style.display = 'none';
            }
        })

        //关闭quote-block
        quoteBlockBtn = document.querySelector(".quote-block .quote-shut");
        quoteBlockBtn.addEventListener('click', function () {
            quoteElement.style.display = 'none';
            quoteBlockElement.style.display = 'flex';
        })
        //关于quote-ty
        quoteTyShutBtn = quoteElement.querySelector(".quote-ty .quote-shut");
        quoteTyShutBtn.addEventListener('click', function () {
            quoteTyElement.style.display = "none";
            quoteElement.style.display = "none"
        })
        //提交quote
        quoteSubmitBtn = document.querySelector(".quote-form-submit button");
        quoteSubmitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!inputMessage.value || !inputEmail.value) {
                if (!inputMessage.value) {
                    messageError.style.display = "block";
                }
                if (!inputEmail.value) {
                    emailError.style.display = "flex"
                }
                return;
            }
            messageError.style.display = "none"
            emailError.style.display = "none";
            quoteSubmitBtn.innerHTML = `
            <svg class="submit-spinner" fill="${btnFontColor}" t="1636169786393" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2394" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M300.576 796.576q0 30.272-21.44 51.712t-51.712 21.44q-29.728 0-51.424-21.728t-21.728-51.424q0-30.272 21.44-51.712t51.712-21.44 51.712 21.44 21.44 51.712zM585.152 914.272q0 30.272-21.44 51.712t-51.712 21.44-51.712-21.44-21.44-51.712 21.44-51.712 51.712-21.44 51.712 21.44 21.44 51.712zM182.848 512q0 30.272-21.44 51.712t-51.712 21.44-51.712-21.44-21.44-51.712 21.44-51.712 51.712-21.44 51.712 21.44 21.44 51.712zM869.728 796.576q0 29.728-21.728 51.424t-51.424 21.728q-30.272 0-51.712-21.44t-21.44-51.712 21.44-51.712 51.712-21.44 51.712 21.44 21.44 51.712zM318.848 227.424q0 37.728-26.848 64.576t-64.576 26.848-64.576-26.848-26.848-64.576 26.848-64.576 64.576-26.848 64.576 26.848 26.848 64.576zM987.424 512q0 30.272-21.44 51.712t-51.712 21.44-51.712-21.44-21.44-51.712 21.44-51.712 51.712-21.44 51.712 21.44 21.44 51.712zM621.728 109.728q0 45.728-32 77.728t-77.728 32-77.728-32-32-77.728 32-77.728 77.728-32 77.728 32 32 77.728zM924.576 227.424q0 53.152-37.728 90.56t-90.272 37.44q-53.152 0-90.56-37.44t-37.44-90.56q0-52.576 37.44-90.272t90.56-37.728q52.576 0 90.272 37.728t37.728 90.272z" p-id="2395"></path></svg>
            `
            submitQuote(inputName.value, inputEmail.value, inputMessage.value, merchantEmail);
            // quoteBlockElement.style.display = "none";
            // quoteTyElement.style.display = "flex";
        })

        //continueShopping
        continueShoppingBtn.addEventListener('click', function () {
            quoteTyElement.style.display = "none";
            quoteElement.style.display = "none"
        })
    }

    //挂载Popup弹窗
    function renderForm() {
        let formHtml = `
                    <div id="product-quote">
                        <div class="quote-mask"></div>
                        <div class="quote-block">
                            <div class="quote-shut">
                                <svg data-v-3444016c="" viewBox="0 0 20 20" focusable="false" aria-hidden="true" class="Polaris-Icon__Svg"><path data-v-3444016c="" d="m11.414 10 4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z"></path></svg>
                            </div>
                            <div class="quote-header">
                                ${formTitle}
                            </div>
                            <div class="quote-product-block">
                                <div class="quote-product-image">
                                    <img src="${productImg}" alt="">
                                </div>
                                <div class="quote-product-info">
                                    <div class="quote-product-title">${currentVariant.name}</div>
                                    <div class="quote-product-variant">
                                    ${currentVariant.title?.toLowerCase() === 'default title' ?
                '' : currentVariant.title}
                                    </div>
                                    <div class="quote-product-sku">${currentVariant.sku}</div>
                                </div>
                            </div>
                            <div class="quote-info-form">
                                <form action="" method="post">
                                    <div class="quote-info-name">
                                        <div class="quote-info-label">
                                            ${formLabelName}:
                                        </div>
                                        <div class="quote-info-input">
                                        <input type="text" placeholder="${formPlaceholdName}" value="">
                                        </div>
                                    </div>
                                    <div class="quote-info-email">
                                        <div class="quote-info-label">
                                        ${formLabelEmail}:
                                        </div>
                                        <div class="email-info-input">
                                            <div class="quote-info-input">
                                                <input type="email" autocomplete="email" placeholder="${formPlaceholdEmail}" >
                                            </div>
                                        </div>
                                        <!-- 邮件格式错误的提示 -->
                                        <div class="input-email-error" style="display: none;">
                                        <div class="email-error-icon">
                                                    <svg fill="#d72c0d" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM9 9a1 1 0 0 0 2 0V7a1 1 0 1 0-2 0v2zm0 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"></path></svg>
                                            </div>
                                            <div class="email-error-hint">
                                           <!-- 之后可以在这里填文字 -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="quote-info-message">
                                        <div class="quote-info-label">
                                        ${formLabelMessage}:
                                        </div>
                                        <div class="quote-info-input">
                                        <textarea name="" id="" placeholder="${formPlaceholdMessage}">${formMessage}</textarea>
                                        </div>
                                        <div class="input-message-error">
                                            <svg fill="#d72c0d" viewBox="0 0 20 20" class="info-needed-icon" focusable="false" aria-hidden="true" style="
                                                width: 20px;
                                                height: 20px;
                                            "><path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM9 9a1 1 0 0 0 2 0V7a1 1 0 1 0-2 0v2zm0 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"></path></svg>
                                        </div>
                                    </div>
                                    <div class="quote-form-submit">
                                        <button type="submit" style="border:${btnBorder ? btnBorder : '1px solid #eee'};">
                                        ${submitText}
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div class="quote-ty">
                            <div class="quote-shut">
                                <svg data-v-3444016c="" viewBox="0 0 20 20" focusable="false" aria-hidden="true" class="Polaris-Icon__Svg"><path data-v-3444016c="" d="m11.414 10 4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z"></path></svg>
                            </div>
                            <div class="quote-header">
                                ${thankTitle}
                            </div>
                            <div class="quote-ty-block">
                                <div class="quote-ty-info">
                                    ${thankContent}
                                </div>
                            </div>
                            <div class="quote-ty-footer">
                                <button style="border:${btnBorder ? btnBorder : '1px solid #eee'}" class="quote-finish-btn">${thankContinue}</button>
                            </div>
                        </div>
                    </div>`
        let body = document.querySelector("body");
        body.insertAdjacentHTML("afterbegin", formHtml);
        //挂载完成了，可以开始加载点击事件了
        handleEvent();
    }
    function handleHideTimer(toggle, selector, els, ms = 20, stopTimes = 1000) {
        /* 
        *  toggle - 当前元素是否需要隐藏
        *  selector - 选择器
        *  el - 函数外定义的变量，比如priceEls，方便给别的函数使用
        *  hideEl - 指定隐藏的目标元素
        *  ms - 延迟时间
        *  stopTimes循环多少次时清除定时器，避免泄露
        */
        return new Promise((resolve, reject) => {
            let times = 0;
            let thisDisplay;
            // 如果selector不为string类型，说明是元素，不需要进行选择了，直接隐藏就可以
            if (selector && typeof selector !== 'string') {
                thisDisplay = window.getComputedStyle(selector, null).display;
                if (toggle == 1) {
                    selector.style.display = "none";
                } else {
                    selector.style.display = thisDisplay;
                }
                resolve({ code: 200, msg: 'success', })
                return;
            } else {
                let timer = setInterval(() => {
                    els = document.querySelectorAll(selector)
                    if (els.length) {
                        for (let i = 0; i < els.length; i++) {
                            if (window.getComputedStyle(els[i], null).display != 'none') {
                                thisDisplay = window.getComputedStyle(els[i], null).display;
                                break;
                            }
                        }
                        if (toggle == 1) {
                            const style = `
                <style>
                  ${selector} {
                    display: none !important;
                  }
                </style>`
                            document.head.insertAdjacentHTML('beforeend', style);
                            for (let i = 0; i < els.length; i++) {
                                els[i].style.display = "none";
                            }
                        } else {
                            for (let i = 0; i < els.length; i++) {
                                els[i].style.display = thisDisplay;
                            }
                        }
                        resolve({ code: 200, msg: 'success', })
                        clearInterval(timer);
                        timer = null;
                    } else {
                        if (times > stopTimes) {
                            clearInterval(timer);
                            timer = null;
                        }
                        resolve({ code: 506, msg: 'failed', })
                    }
                    times++;
                }, ms)
            }

        })
    }
    function handleHide() {

        // debug && console.log("price" + price);
        // debug && console.log("addCart" + addCart);
        // debug && console.log("buyNow" + buyNow);
        // debug && console.log(shopify_payment_button);
        // Price
        const priceSelector = ".price, .product__price, .product-price__price, #ProductPrice, .product-single__price, .price-container, [class*=product__price], [class*=Price]"
        const buyNowSelector = "[class*=shopify-payment-button], .shopify-cleanslate button"
        const atcSelector = ".add-to-cart, [class*=AddToCart], [data-action*=data-action], [class*=add-to-cart], [aria-label*=cart], [data-add-to-cart]"
        const pricePromise = handleHideTimer(price, priceSelector, priceEls)
        pricePromise.then(res => {
            if (res.code !== 200) {
                console.log('Select price failed');
            }
        })
        let addCartPromise
        //add to cart
        if (soldOutBtn) {
            addToCartEls = soldOutBtn;
        }
        addCartPromise = handleHideTimer(addCart, atcSelector, addToCartEls)
        addCartPromise.then(res => {
            if (res.code !== 200) {
                console.log('Select add to cart failed');
            }
        })
        const buyNowPromise = handleHideTimer(buyNow, buyNowSelector, buyNowEls)
        buyNowPromise.then(res => {
            if (res.code !== 200) {
                console.log('Select buy now failed');
            }
        })

    }
    function handleMatchByTheme(shopId) {
        // debug && console.log(shopId);
        // 传递的参数
        let params = {
            shopId: shopId,
            buttonColor: btnColor,
            fontColor: btnFontColor,
            fontSize: btnFontSize.slice(0, -2),
            buttonHeight: btnHeight.slice(0, -2),
            buttonWidth: btnWidth.slice(0, -2),
            adaptiveStatus: 0,
        };
        // debug && console.log(params);
        // 获取xmlHttpRequest对象
        let xmlHttp = new XMLHttpRequest();
        // API路由
        let url = baseUrl + 'api/v1/script/' + 'adaptiveButton';
        // post请求方式
        xmlHttp.open('POST', url, false);
        // 添加http头，发送信息至服务器时的内容编码类型
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        // 发送数据，请求体数据
        xmlHttp.send(JSON.stringify(params));
        //从服务器上获取数据
        let dataJson = JSON.parse(xmlHttp.responseText);
        // debug && console.log(dataJson);
    }

    // 检测邮件格式
    function checkEmailAddress(val) {
        let reg = new RegExp(
            /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        );
        if (!reg.test(val)) {
            return false;
        } else {
            return true;
        }
    }

    function hexToRgba(hex, opacity) {
        let red = parseInt("0x" + hex.slice(1, 3));
        let green = parseInt("0x" + hex.slice(3, 5));
        let blue = parseInt("0x" + hex.slice(5, 7));
        let redHover = red - 20 > 0 ? red - 20 : red;
        let greenHover = green - 20 > 0 ? green - 20 : green;
        let blueHover = blue - 20 > 0 ? blue - 20 : blue;
        let RGBA = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        let RGBAHover = `rgba(${redHover}, ${greenHover}, ${blueHover}, ${opacity})`;

        return {
            red: red,
            green: green,
            blue: blue,
            rgba: RGBA,
            rgbaHover: RGBAHover
        }
    }
    function RGBtoHex(value) {
        if (/rgba?/.test(value)) {
            var array = value.split(",");
            //不符合rgb或rgb规则直接return
            if (array.length < 3)
                return "";
            value = "#";
            for (var i = 0, color; color = array[i++];) {
                if (i < 4) {
                    //前三位转换成16进制
                    color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
                    value += color.length == 1 ? "0" + color : color;
                } else {
                    //rgba的透明度转换成16进制
                    color = color.replace(')', '')
                    var colorA = parseInt(color * 255);
                    var colorAHex = colorA.toString(16);
                    value += colorAHex;
                }
            }
            value = value.toUpperCase();
        }
        return value;
    }

    //初始化按钮
    // function initQuoteElement() {
    //     if (buttonSwitch === 1 && enable) {
    //         emailButtonElement.style.display = "flex";

    //     } else {
    //         // if (shopify_payment_button !== null) shopify_payment_button.style.display = "block";
    //         if (emailButtonElement !== null) emailButtonElement.style.display = "none";
    //     }
    // }

    //inject css 样式
    function importStyles() {
        const styles = `<style>
        ${customStyle}
            .easy-quote-button{
                margin-top: 20px;
                width: 100%;
                height: 44px;
                border-width: 0px;
                font-size: 15px;
                cursor: pointer;
                letter-spacing: .1rem;
                border-radius: 2px;
                background-color: ${btnColor} ;
                transition: background-color .2s ease-in-out;
                border:${btnBorder};
            }
            .easy-quote-button:hover{
                background-color: ${btnHoverColor};
                border-width: ${btnHoverBorder};
            }
            .email-me-button:hover{
               opacity: 0.8;
            }
            #product-restore-quote{
                display: none;
                justify-content: center;
            }
            #email-me-frame { 
                display: none; 
                position: fixed; 
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.2);
                z-index: 9999999;
            }
            #email-me-frame .email-provider span{
                color: blue;
            }
            /* 现在开始是弹窗的设置 */
            #product-quote{
                display: none;
            }
            .quote-mask{
                width: 100%;
                height: 100%;
                background-color: rgba(30, 30, 30, .3);
                position: fixed;
                z-index: 99999;
            }
            .quote-block, .quote-ty{
                display: none;
                width: 86%;
                flex-direction:column;
                justify-content:center;
                min-width: 342px;
                max-width: 580px;
                position: fixed;
                top: 50%;   
                left: 50%;   
                -webkit-transform: translate(-50%, -56%);   
                -moz-transform: translate(-50%, -56%);   
                -ms-transform: translate(-50%, -56%);   
                -o-transform: translate(-50%, -56%);   
                transform: translate(-50%, -56%);   
                background-color: #fff;
                border:1px solid #eee;
                padding:0 20px;
                font-size: 14px;
                z-index:999999;
                animation: fadeIn .15s linear;
            }
            .quote-ty{
                min-height: auto;
            }
            .quote-shut{
                width: 20px;
                height: 20px;
                position: absolute;
                top:8px;
                right:8px;
                cursor: pointer;
            }
            .quote-shut svg{
                width: 100%;
                height: 100%;
            }
            .quote-header{
                padding:20px;
                font-size: 20px;
                font-weight: 600;
                text-align: center;            
            }
            .quote-ty .quote-header{
                padding: 60px 0 30px 0;
                font-size: 32px;
            }
            .quote-product-block{
                display: flex;
            }
            .quote-product-image{
                width:120px;
                height:120px;
            }
            .quote-product-image img{
                width: 100%;
                height: 100%;
            }
            .quote-product-info{
                font-size: 16px;
                flex:1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 12px;
            }
            .quote-product-title{
                text-overflow: ellipsis;
                -webkit-line-clamp: 3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .quote-product-variant, .quote-product-sku{
                color: #ccc;
            }
            .quote-info-form{
                padding:20px 0;
            }
            .quote-form-submit,
            .quote-ty-footer{
                display: flex;
                justify-content: center;
                padding:10px;
            }
            .submit-spinner{
                width:22px;
                height:22px;
                animation: spin 1s infinite;
            }
            .quote-ty-footer{
                padding: 30px 0 60px 0; 
            }
            .easy-quote-button, 
            .quote-form-submit button,
            .quote-ty-footer button{
                color: ${checkFontVisibility(btnColor, btnFontColor) ? btnFontColor : "#333333"};
            }
            .quote-form-submit button,
            .quote-ty-footer button{
                background-color: ${btnColor};
                height: ${btnHeight}
                width: ${btnWidth}
                font-size: ${btnFontSize};
                font-weight: 500;
                padding:12px 60px;
                cursor:pointer;
                border:none;
                display:inline-flex;
                justify-content:center;
                align-items:center;
            }
            .quote-form-submit button:hover{
                background-color: ${btnHoverColor};
            }
            .quote-ty-footer button:hover{
                background-color: ${btnHoverColor};
            }
            .quote-info-name,
            .quote-info-email,
            .quote-info-message{
                display: flex;
                align-items: center;
                padding:12px 0;
            }
            .quote-info-name .quote-info-input,
            .quote-info-email .quote-info-input,
            .email-info-input{
                max-width: 300px;
                flex:1;
                margin-left: 24px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .email-info-input{
                border:none;
            }
            .quote-info-label{
                width: 20%;
            }
            .quote-info-input{
                margin-left: 24px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .quote-info-email .quote-info-input{
                margin-left:0;
            }
            .quote-info-message .quote-info-input{
                flex:1;
            }
            .quote-info-input input,
            .quote-info-input textarea{
                padding: 8px;
                border: none;
                height: 100%;
                width: 100%;
                resize:none;
                outline: none;
                box-shadow: none !important;
                background-color: #ffffff;
            }
            .input-message-error{
                display: none;
            }
            /* TY专属 */
            .quote-ty{
                max-height: 428px;
            }
            .quote-ty-info{
                padding: 10px;
                font-size: 16px;
                font-weight: 500;
            }
            .quote-ty .quote-header,
            .quote-ty-block,
            .quote-ty-footer{
                flex:1;
                align-items:center;
                text-align:center;
            }
            .quote-finish-btn{
                padding:12px 36px;
            }
            .info-needed-icon{
                margin-left:4px;
            }
            @keyframes fadeIn {
                0%{
                    opacity: .4;
                }
                100% {
                    opacity: 1;
                }
            }
            @keyframes spin {
                0%{
                    transform: rotate(0deg);
                }
                100%{
                    transform: rotate(360deg);
                }
            }
            .input-email-error{
                display:flex;
                align-items:center;
            }
            .email-error-icon{
                margin-right:8px;
                width: 20px;
                height: 20px;
                color: #d72c0d;
            }
            .email-error-hint{
                color: #d72c0d;
                font-size: 12px;
            }
            @media screen and (max-width: 350px) {
                .quote-block{
                    width: 98%;
                    min-width: auto;
                }
            }
            }</style>`
        document.head.insertAdjacentHTML("beforeend", styles);
    }
})();
