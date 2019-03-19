/*Custom scripts*/

var searchSelectorObject = new Object();//object to search selector
searchSelectorObject.isNotCurrentSelector = false; // is or not a search selector
searchSelectorObject.selector             = '.search-bar input[type="search"]'; //search selector

//notifications
/** 
 * get notification type
 * @param type notification type
 * @return _notification object
*/ 
function notificationType(type) {
    var _notification = {};
    var _buttons = new Array();
    var _message = '';
    var _color = '';

    if (type == 'success') { //if notifications is success
        _message = '<span><img src="assets/printer-tool@2x.png" class="printer" alt=""></span> <span class="toast-text">Por favor, colocar papeleta en impresora</span>';
        _color = 'green';
        _buttons[0] = '<input type="button" class="success outline invert" value="Aceptar">';
        _buttons[1] = '<input type="button" class="success outline invert" value="Nuevo depósito">';

    } else { //if notificacion is error
        _message = '<span><img src="assets/warning@2x.png" class="printer" alt=""></span> <span class="toast-text">Por favor, ingrese los datos del desglose e intente de nuevo</span>';
        _color = 'red';
        _buttons[0] = '<input type="button" class="success outline invert" value="Aceptar">';
        _buttons[1] = '<input type="hidden" class="success outline invert" value="Nuevo depósito">';
    }

    _notification = {
        message: _message,
        color: _color,
        buttons: _buttons
    };

    return _notification;
}

/** 
 * remove active class
 * @param selector selector to remove active class
*/ 
function removeActive(selector) {
    $(selector).removeClass('active');
}

/** 
 * add active class
 * @param selector selector to add active class
*/ 
function addActive(selector) {
    $(selector).addClass('active');
}

/** 
 * add active class
*/ 
function hideSidebar() {
    $('.dark.flex.betweenV').hide();
}

/** 
 * show sidebar
 * @param selector selector to show sidebar (dashboard or deposito)
*/ 
function showSidebar(selector) {
    var targetSidebar = null;
    targetSidebar = $(selector).data('target'); //get html attribute value call it data-target
    $(targetSidebar).show(); //show sidebar
}

/** 
 * add active class to breadcrumb tabs
 * @param tab selector to active tab (dashboard or deposito)
*/ 
function activeTab(tab) {
    addActive(tab);
    addActive(tab + '>a');
}

/** 
 * remove active class to breadcrumb tabs
*/ 
function inactiveTab() {
    removeActive('.etabs .tab a');
    removeActive('.etabs .tab');
}

/** 
 * hide desglose panel on deposito section
*/ 
function hideDesglosePanel() {
    $(".depositosTabs>div").hide();
}

//show breadcrumb depending for which panel will show
function showBreadcrumbDesglosePanel(panel) {
    switch (panel) {
        case '#desglose-monedas': //show desglose monedas panel
            $('.breadcrumb li:nth-child(3) a').show();
            addActive('.breadcrumb li:nth-child(3)');
            break;
        case '#desglose-cheques': //show desglose cheques panel
            $('.breadcrumb li:nth-child(3) a').show();
            $('.breadcrumb li:nth-child(4) a').show();
            addActive('.breadcrumb li:nth-child(4)');
            break;
    }
}

//change desglose panel on deposito section
function changeDesglosePanel(panel) {
    var targetPanel = null;
    targetPanel = $(panel).data('container'); //get html attribute value call it data-container
    hideDesglosePanel();
    $(targetPanel).show();
    showBreadcrumbDesglosePanel(targetPanel);
}

//hide breadcrumb depending for which breadcrumb is selected
function hideBreadcrumbDesglosePanel(panel) {
    var targetPanel = null;
    targetPanel = $(panel).attr('tab'); //get html attribute tab value
    switch (targetPanel) {
        case '#datos': //hide both breadcrumb - desglose monedas and desglose cheques 
            $('.breadcrumb li:nth-child(3) a').hide();
            $('.breadcrumb li:nth-child(4) a').hide();
            break;
        case '#desglose-monedas': //hide desglose cheques breadcrumb
            $('.breadcrumb li:last-child() a').hide();
            break;
    }
}

//change Icon, method used only for IE10+
function changeIconOnNavigationBar(selector) {
    $('.navigationBar li').each(function(index, value) {
        hidePurpleIcon(this)
    });
    showPurpleIcon(selector);
}

//show icon purple
function showPurpleIcon(selector) {
    $(selector).find('img').attr('src', $(selector).find('img').data('hover')); //change original icon for purple icon
}

//hide icon purple
function hidePurpleIcon(selector) {
    $(selector).find('img').attr('src', $(selector).find('a img').data('offhover')); //change purple icon for original icon
}

//show sidebar when is collapse
function unWrapSidebarWhenIsCollapse() {
    $('.sidebar').removeClass('collapse');
    $("#toggleSidebar").removeClass('pressed');
    $("#toggleSidebar").show();
}

//show search menu
function showDropdownMenuSearch(){
    $('ul.search-dropdown').addClass('show');
    $("ul.search-dropdown").show();
}

//hide search menu
function hideDropdownMenuSearch(){
    $('ul.search-dropdown').removeClass('show');
    $("ul.search-dropdown").hide();
}

//add placeholder Nota
function addPlaceHolderNota(selector){
    $(selector).attr('placeholder', 'Nota');
}

//add placeholder Buscar
function addPlaceHolderBuscarModulo(selector){
    $(selector).attr('placeholder', 'Buscar módulo o transacción');
}

//change placeholder search input
function changePlaceholderSearch(selectorObj){
    //if the search menu is not visible  and no click on search input 
    if (!$('ul.search-dropdown').hasClass('show') && selectorObj.isNotCurrentSelector == false) {
        addPlaceHolderNota(selectorObj.selector); //add placeholder nota into search input
        showDropdownMenuSearch(); // show search menu
    } else {
        addPlaceHolderBuscarModulo(selectorObj.selector);//add placeholder buscar into search input
        hideDropdownMenuSearch();//hide search menu
    }
}

//hide user menu
function hideUserMenu(){
    $(".navigationBar .user .over-menu").hide();
}

//hide new deposito menu
function hideNewDepositoMenu(){
    $(".etabs .over-menu").hide();
}

//hide all menus 
function hideAllMenus(selectorObj){
    hideUserMenu();
    hideNewDepositoMenu();
    changePlaceholderSearch(selectorObj)
}

jQuery(document).ready(function($) {

    addActive('.breadcrumb li:nth-child(2)'); //breadcrumb #datos active

    //JS only apply to IE - change purple img to first option on the navigationBar (active)
    if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        showPurpleIcon('.navigationBar .sections li:nth-child(2)'); //first icon active.
    }

    // Tabs for general content
    $(".generalContentTabs").tabslet({
        animation: true
    });

    // Tabs de contenido
    $(".depositosTabs").tabslet({
        animation: false,
        attribute: "tab"
    });

    // Tabs for sidebar
    $(".navigationBarSectionsTabs").tabslet({
        container: ".sidebar",
        animation: false
    });

    //Hide (search, user and new deposito) Menu
    $(".flex.fullHeight").click(function(event) {
        searchSelectorObject.isNotCurrentSelector = true;
        hideAllMenus(searchSelectorObject);
    });

    // Show second level menu
    $('.menu-primer-nivel').on('click', 'li', function() {

        if ($('.menu-primer-nivel li').hasClass('active')) {
            removeActive('.menu-primer-nivel li');
            $(".menu-segundo-nivel").hide();
        } else {
            addActive(this);
            $(".menu-segundo-nivel").show();
        }

    });

    //hide toggleSidebar icon when moduleSide is clicked
    $(".navigationBar li a").click(function(event) {
        searchSelectorObject.isNotCurrentSelector = true;
        hideNewDepositoMenu();// hide green menu
        changePlaceholderSearch(searchSelectorObject); // hide search menu and change placeholder input
        if ($(this).hasClass("user")) { //if user option is clicked
            $(".navigationBar .user .over-menu").toggle();//show user menu
            removeActive('.over-menu.purple-menu li:nth-child(2)');
        } else {//clicked another options into sidebar menu
            hideAllMenus(searchSelectorObject);//hide all menus
            unWrapSidebarWhenIsCollapse();//show sidebar and change arrow icon
            removeActive('.menu-primer-nivel li');
            if ($(this).hasClass("moduleSide")) { //if module option is clicked
                if (!$("#toggleSidebar").hasClass('pressed')) {
                    $("#toggleSidebar").hide();//hide arrow icon
                }
                $(".menu-segundo-nivel").hide();
            }
            //JS only apply to IE - change icon when is active
            if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
                changeIconOnNavigationBar(this); //change icon to purple
            }
        }

        $('#toggleSidebar').find('img').attr('src', $('#toggleSidebar').find('img').data('iconoriginal'));//chabge icon arrrow to original icon on sidebar
    });

    //JS only apply to IE - change img on hover
    $(".navigationBar li").hover(function() {
        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            showPurpleIcon(this); //hover in, get purple icon
        }
    }, function() {
        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            if (!$(this).hasClass('active')) {
                hidePurpleIcon(this); //hover out, hide purple icon
            }
        }
    });

    // Show user menu
    $(".navigationBar .user").click(function() {
        searchSelectorObject.isNotCurrentSelector = true;
        hideNewDepositoMenu();
        changePlaceholderSearch(searchSelectorObject);
        $(".navigationBar .user .over-menu").toggle();
        addActive('.navigationBar .sections > li:nth-child(2) a');
        addActive('.navigationBar .sections > li:nth-child(2)');
        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            changeIconOnNavigationBar('.navigationBar .sections > li:nth-child(2) a');
        }
        unWrapSidebarWhenIsCollapse();
    });

    // Show add menu
    $(".etabs .add").click(function() {
        searchSelectorObject.isNotCurrentSelector = true;
        hideUserMenu();
        changePlaceholderSearch(searchSelectorObject);
        $(".etabs .over-menu").toggle();
    });

    $(".etabs .add a").tabslet({
        animation: false,
    });

    //Change sidebar
    $(".etabs .tab a").click(function() {
        searchSelectorObject.isNotCurrentSelector = true;
        hideAllMenus(searchSelectorObject);
        hideSidebar();
        removeActive('.etabs .tab a');
        showSidebar(this);
        addActive(this);
        removeActive('.navigationBar li');
        addActive('.navigationBar .navigationBarSectionsTabs > li:nth-child(2)');
        addActive('.navigationBar .sections > li:nth-child(2)');
        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            changeIconOnNavigationBar('.navigationBar .sections li:nth-child(2)');
        }
    });

    // Submenu on plus green button
    $(".submenu").click(function() {

        tab = '.etabs .tab a.active';
        target = '';
        target = $(tab).attr('href');
        $(target).show();

        addActive('+ ul');
        removeActive('.etabs .tab a');

        switch (target) {
            case '#dashboard':
                $(".tab:first-child").addClass("active");
                $(".tab:first-child a").addClass("active");
                break;
            case '#deposito':
                $(".tab:nth-child(2)").addClass("active");
                $(".tab:nth-child(2) a").addClass("active");
                break;
        }

    });

    // Submenu on new deposito button
    $(".over-menu.green-menu li:first-child()").click(function() {
        $('.contentTab').hide();
        hideSidebar();
        $('#deposito').show();
        $('#depositoSide').show();
        inactiveTab();
        activeTab('.tab:nth-child(2)');
    });

    //Dropdown on search
    $(".search-bar input[type='search']").click(function(ev) {
        ev.stopPropagation();
        searchSelectorObject.isNotCurrentSelector = false;
        hideAllMenus(searchSelectorObject);
    });

    //Toggle Sidebar
    $("#toggleSidebar").click(function() {
        $(".sidebar").toggleClass("collapse");
        $(this).toggleClass("pressed");
        $(".article").css("max-width", "calc(100%)");
        $(".over-menu.purple-menu").hide();
        if ($(this).hasClass('pressed')) {
            $(this).find('img').attr('src', $(this).find('img').data('iconpressed'));
        } else {
            $(this).find('img').attr('src', $(this).find('img').data('iconoriginal'));
        }
    });

    //hide breadcrumb not selected
    $(".breadcrumb li a").click(function() {
        hideBreadcrumbDesglosePanel(this);
    });

    //change desglose div
    $(".input-desglose").click(function() {
        removeActive('.breadcrumb li');
        changeDesglosePanel(this);
        $(".buttons-right").show();
    });

    //tooltip dashboard redirect to dashboard grid
    $(".tooltip[href='#dashboardSide']").click(function() {
        $('.contentTab').hide();
        $('#dashboard').show();
        inactiveTab();
        activeTab('.tab:first-child()');
    });

    //close second menu with on click option modulos
    $('.menu-primer-nivel li').click(function() {
        if ($(this).hasClass('active')) {
            $('.menu-segundo-nivel').hide();
        };
    });

    //close segundo menu
    $('.menu-segundo-nivel>div:first-child').on("click", function() {
        $('.menu-segundo-nivel').hide();
    });

    //close modulos menu
    $('.menu-primer-nivel>div:first-child').on("click", function() {
        removeActive('.navigationBar .sections li');
        addActive('.navigationBar .sections li:nth-child(2)');
        hideSidebar();
        showSidebar('.etabs .tab a.active');
        unWrapSidebarWhenIsCollapse();
    });

    //close desglose cheques when cancelar button is clicked
    $('#desglose-cheques .buttons-right .default.outline').on("click", function() {
        hideBreadcrumbDesglosePanel('.breadcrumb li:nth-child(3) a');
        changeDesglosePanel(this);
    });

    //close desglose monedas when cancelar button is clicked
    $('#desglose-monedas .buttons-right .default.outline').on("click", function() {
        hideBreadcrumbDesglosePanel('.breadcrumb li:nth-child(2) a');
        changeDesglosePanel(this);
        addActive('.breadcrumb li:nth-child(2)');
    });

    // IziToast for simple notifications
    $(".small-notification").on("click", function(event) {

        var _notification = notificationType($(this).data('type'));
        event.preventDefault();

        iziToast.show({
            id: null,
            class: "",
            title: _notification.message,
            titleColor: "",
            titleSize: "",
            titleLineHeight: "",
            message: "",
            messageColor: "",
            messageSize: "",
            messageLineHeight: "",
            backgroundColor: "",
            theme: "dark", // dark
            color: _notification.color, // red, green
            icon: "",
            iconText: "",
            iconColor: "",
            iconUrl: null,
            image: "",
            imageWidth: null,
            maxWidth: null,
            zindex: null,
            layout: 1,
            balloon: false,
            close: false,
            closeOnEscape: false,
            closeOnClick: false,
            displayMode: 'once', // once, replace
            position: "bottomRight", // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            target: "",
            targetFirst: true,
            timeout: null,
            rtl: false,
            animateInside: false,
            drag: false,
            pauseOnHover: true,
            resetOnHover: false,
            progressBar: true,
            progressBarColor: "",
            progressBarEasing: "linear",
            overlay: true,
            overlayClose: false,
            overlayColor: "rgba(0, 0, 0, 0.3)",
            transitionIn: false,
            transitionOut: false,
            transitionInMobile: false,
            transitionOutMobile: false,
            inputs: {},
            onOpening: function() {},
            onOpened: function() {},
            buttons: [
                [
                    _notification.buttons[1],
                    function(instance, toast) {
                        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                    },
                    true
                ],
                [
                    _notification.buttons[0],
                    function(instance, toast) {
                        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                    }
                ]
            ],
            onClosing: function(instance, toast, closedBy) {
                console.info("Closing | closedBy: " + closedBy);
            },
            onClosed: function(instance, toast, closedBy) {
                console.info("Closed | closedBy: " + closedBy);
            }
        });
    });

    // IziToast for big notifications
    $(".big-notification").on("click", function(event) {
        event.preventDefault();

        iziToast.show({
            id: "haduken",
            theme: "light",
            displayMode: 2,
            progressBar: true,
            messageSize: "",
            close: false,
            overlay: true,
            overlayColor: "rgba(0, 0, 0, 0.3)",
            timeout: false,
            animateInside: false,
            message: "¿Está seguro que desea salir sin <br> completar el formulario?",
            position: "bottomRight",
            image: "./assets/warning@2x.png",
            imageWidth: 70,
            layout: 2,
            maxWidth: 600,
            buttons: [
                [
                    '<input type="button" class="default outline" value="Cancelar">',
                    function(instance, toast) {
                        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                    },
                    true
                ],
                [
                    '<input type="button" class="success" value="Aceptar">',
                    function(instance, toast) {
                        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                    }
                ]
            ]
        });
    });


}); //Jquery.Ready/