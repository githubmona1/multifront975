var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PageCount;
var PageIndex;
var PageSize;
var RecordPerPageFieldName;
var PageFieldName;
var Sort;
var SortDir;
var SortFieldName;
var SortDirFieldName;
var inCallback = false;
var hasReachedEndofScroll = false;
var scrollReachedToBottomAbove = 2200;
var GridPager = /** @class */ (function (_super) {
    __extends(GridPager, _super);
    function GridPager(doc) {
        return _super.call(this) || this;
    }
    GridPager.prototype.GridUpdateHandler = function (data) {
        $("#" + UpdateContainerId).html(data);
        DynamicGrid.prototype.SetSortOrder();
        GridPager.prototype.UpdateHandler();
        $("#grid .grid-header th a").off("click");
        $("#grid .grid-header th a").on("click", function (e) {
            GridPager.prototype.FindSelectedCheckbox(this);
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SortingHandler(e, this);
        });
        $(".pageSizeList").off("change");
        $(".pageSizeList").on("change", function () {
            GridPager.prototype.FindSelectedCheckbox(this);
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SelectedPageSize(this);
        });
        $('.pagerTxt').off("keyup");
        $('.pagerTxt').on("keyup", function (e) {
            //if enter key is pressed
            if (e.keyCode == 13) {
                GridPager.prototype.FindSelectedCheckbox(this);
                GridPager.prototype.GetUpdateContainerId(this);
                GridPager.prototype.UrlHandler(this);
            }
        });
        ZnodeBase.prototype.HideLoader();
        $("#divErrorMessage").hide();
        $(document).trigger("GRID_UPDATED");
    };
    GridPager.prototype.UpdateHandler = function () {
        this.PreviousAndNextUpdateHandler();
        this.SelectedValueHandler();
        this.SetPagingInput();
        this.PagingHandler();
        this.SetArrows();
        GridPager.prototype.SetSelectedCheckboxChecked();
        ZnodeBase.prototype.activeAsidePannel();
        ZnodeBase.prototype.OnImgError();
    };
    GridPager.prototype.Init = function () {
        GridPager.prototype.UpdateHandler();
        if (PageCount == 0) {
            $('.pageSizeList').attr('disabled', '');
            $('.pagerTxt').attr('disabled', '');
        }
        $('.pagerTxt').off("keyup");
        $('.pagerTxt').on("keyup", function (e) {
            //if enter key is pressed
            if (e.keyCode == 13) {
                GridPager.prototype.GetUpdateContainerId(this);
                GridPager.prototype.UrlHandler(this);
            }
        });
        $(".pageSizeList").off("change");
        $(".pageSizeList").on("change", function () {
            GridPager.prototype.FindSelectedCheckbox(this);
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SelectedPageSize(this);
        });
        $("#grid .grid-header th a").off("click");
        $("#grid .grid-header th a").on("click", function (e) {
            GridPager.prototype.FindSelectedCheckbox(this);
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SortingHandler(e, this);
        });
    };
    GridPager.prototype.GetUpdateContainerId = function (control) {
        UpdateContainerId = $(control).closest('section').attr('update-container-id');
    };
    GridPager.prototype.SetUpdateContainerId = function (containerId) {
        UpdateContainerId = containerId;
    };
    GridPager.prototype.SetArrows = function () {
        GridPager.prototype.SetSortableIcon();
        var dir = $('#dir').val();
        var col = $('#col').val();
        var sortCol = "sort=" + col;
        var header = null;
        $('th a').each(function () {
            var href = $(this).attr('href');
            if (href.indexOf(sortCol) != -1) {
                header = $(this);
                return false;
            }
        });
        if (header != null) {
            if (SortDir != null && col != "" && typeof col != typeof undefined && col != null) {
                DynamicGrid.prototype.UncheckAllSelectedCheckboxItems();
                if (dir == 'Ascending') {
                    header.removeClass('selected');
                    header.addClass('selected');
                    header.removeClass('Descending');
                    header.addClass('Ascending');
                    header.html(header.text() + '<i class="z-up"></i>');
                }
                if (dir == 'Descending') {
                    header.removeClass('selected');
                    header.addClass('selected');
                    header.removeClass('Ascending');
                    header.addClass('Descending');
                    header.html(header.text() + '<i class="z-down"></i>');
                }
            }
        }
    };
    GridPager.prototype.PreviousAndNextUpdateHandler = function () {
        var MaxPages = PageCount;
        var currentPageNumber = PageIndex + 1;
    };
    GridPager.prototype.SetSortableIcon = function () {
        $("[data-swhglnk=true]").each(function () {
            if ($(this).find('i').length == 0) {
                $(this).append("<i class='z-sortable'></i>");
            }
        });
    };
    GridPager.prototype.SetPagingInput = function () {
        $('.pagerTxt').attr("onkeypress", "return /^[0-9]+$/.test(event.key)");
        var currentPageNumber = 0;
        if (typeof PageIndex != 'undefined') {
            currentPageNumber = parseInt(PageIndex) + 1;
        }
        else {
            currentPageNumber = 1;
        }
        var MaxPages = PageCount;
        $(_gridContainerName + " .pagerTxt").attr('value', currentPageNumber);
        if (MaxPages == 1) {
            $(_gridContainerName + " #pageCountLabel").html('Page');
        }
        else {
            $(_gridContainerName + " #pageCountLabel").html("Pages");
        }
        if (parseInt($(_gridContainerName + ' #totalRecoredCount').text()) > 1)
            $(_gridContainerName + ' #spanRecordFound').text($(_gridContainerName + ' #totalRecoredCount').text() + ' record found.');
        if (parseInt($(_gridContainerName + ' #totalRecoredCount').text()) < 1 || $(_gridContainerName + ' #totalRecoredCount').text() == "")
            $(_gridContainerName + ' #spanRecordFound').hide();
        else
            $(_gridContainerName + ' #spanRecordFound').text($(_gridContainerName + ' #totalRecoredCount').text() + ' record found.');
    };
    GridPager.prototype.GetRedirectUrl = function () {
        var redirecturl = $("#grid th a:eq(1)").attr('href');
        redirecturl = redirecturl !== undefined ? redirecturl.indexOf('&recordPerPage') > 0 ? redirecturl.substring(0, redirecturl.indexOf('&recordPerPage')) : redirecturl : redirecturl;
        if (redirecturl === undefined && $("#grid").closest(".dynamic-tabs").find('ul > li').eq($(".dynamic-tabs").tabs("option", "active")).length > 0) {
            redirecturl = $("#grid").closest(".dynamic-tabs").find('ul > li').eq($(".dynamic-tabs").tabs("option", "active")).find('a').attr('href');
            var paramVal = $("#grid").closest(".tab-container").find('li[class=active]').find('a').attr('data-queryparam');
            if (paramVal !== undefined)
                redirecturl += "?" + paramVal;
        }
        else if (redirecturl !== undefined)
            redirecturl = redirecturl.substring(0, $("#grid th a:eq(1)").attr('href').indexOf('sort') - 1);
        if (redirecturl === undefined || redirecturl === "")
            redirecturl = window.location.href;
        else
            redirecturl = window.location.protocol + "//" + window.location.host + redirecturl;
        if ($('#isUploadPopup') != undefined && $('#isUploadPopup').val() == "true")
            redirecturl = $('#MediaList').val();
        return redirecturl;
    };
    GridPager.prototype.FindSelectedCheckbox = function (control) {
        if (UpdateContainerId !== $(control).closest("section").attr("update-container-id")) {
            CheckBoxCollection = new Array();
        }
        $(control).closest("section").find("#grid tbody").find("input[type=checkbox]:checked").each(function () {
            var _checkbox = this.id;
            if (jQuery.inArray(_checkbox, CheckBoxCollection) === -1) {
                CheckBoxCollection.push(_checkbox);
            }
        });
    };
    GridPager.prototype.SetSelectedCheckboxChecked = function () {
        for (var i = 0; i < CheckBoxCollection.length; i++) {
            $("#" + UpdateContainerId + " #" + CheckBoxCollection[i]).prop("checked", true);
        }
    };
    GridPager.prototype.PagingHandler = function () {
        $(document).off('click', "#nextPage");
        $(document).on('click', "#nextPage", function (e) {
            // CheckBoxCollection = DynamicGrid.prototype
            e.preventDefault();
            GridPager.prototype.FindSelectedCheckbox(this);
            var MaxPages = parseInt($(this).closest("section").find("#PageCount").val());
            var currentPageNumber = parseInt($(this).closest("section").find("#pagerTxt").val());
            var requestedPage = currentPageNumber + 1;
            var url = window.location.protocol + "//" + window.location.host + $(this).closest('section').attr('data-pager-url'); //GridPager.prototype.GetRedirectUrl();
            var _viewMode = $('#viewmode').attr("value");
            if (requestedPage > MaxPages) {
                requestedPage = currentPageNumber;
            }
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SetCustomJurl(requestedPage, _viewMode, url);
        });
        $(document).off('click', "#previousPage");
        $(document).on('click', "#previousPage", function (e) {
            e.preventDefault();
            GridPager.prototype.FindSelectedCheckbox(this);
            var currentPageNumber = parseInt($(this).closest("section").find("#pagerTxt").val());
            var requestedPage = currentPageNumber - 1;
            var url = window.location.protocol + "//" + window.location.host + $(this).closest('section').attr('data-pager-url'); //GridPager.prototype.GetRedirectUrl();
            var _viewMode = $('#viewmode').attr("value");
            if (requestedPage <= 0) {
                requestedPage = currentPageNumber;
            }
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SetCustomJurl(requestedPage, _viewMode, url);
        });
        $(document).off('click', "#first");
        $(document).on('click', "#first", function (e) {
            e.preventDefault();
            GridPager.prototype.FindSelectedCheckbox(this);
            var requestedPage = 1;
            var url = window.location.protocol + "//" + window.location.host + $(this).closest('section').attr('data-pager-url'); //GridPager.prototype.GetRedirectUrl();
            var _viewMode = $('#viewmode').attr("value");
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SetCustomJurl(requestedPage, _viewMode, url);
        });
        $(document).off('click', "#last");
        $(document).on('click', "#last", function (e) {
            e.preventDefault();
            GridPager.prototype.FindSelectedCheckbox(this);
            var currentPageNumber = parseInt($(this).closest("section").find("#pagerTxt").val());
            var requestedPage = parseInt($(this).closest("section").find("#PageCount").val());
            var url = window.location.protocol + "//" + window.location.host + $(this).closest('section').attr('data-pager-url'); // GridPager.prototype.GetRedirectUrl();
            var _viewMode = $('#viewmode').attr("value");
            if (requestedPage <= 0) {
                requestedPage = currentPageNumber;
            }
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SetCustomJurl(requestedPage, _viewMode, url);
        });
        $(document).off('click', "#refreshGrid");
        $(document).on('click', "#refreshGrid", function (e) {
            e.preventDefault();
            GridPager.prototype.FindSelectedCheckbox(this);
            var currentPageNumber = parseInt($(this).closest("section").find("#pagerTxt").val());
            var requestedPage = currentPageNumber;
            var maxPages = parseInt($(this).closest("section").find("#PageCount").val());
            var isPagerDisable = maxPages == 0;
            if (!isPagerDisable) {
                if (isNaN(currentPageNumber) || currentPageNumber > maxPages || currentPageNumber < 1)
                    return false;
            }
            var url = window.location.protocol + "//" + window.location.host + $(this).closest('section').attr('data-pager-url'); //GridPager.prototype.GetRedirectUrl();
            var _viewMode = $('#viewmode').attr("value");
            if (requestedPage <= 0) {
                requestedPage = currentPageNumber;
            }
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.SetCustomJurl(requestedPage, _viewMode, url);
        });
        $(".detail_view").off("click");
        $(".detail_view").on('click', function (e) {
            e.preventDefault();
            var _newUrl = MediaManagerTools.prototype.UpdateQueryString("displayMode", $(this).attr("id"), window.location.href);
            window.history.pushState({ path: _newUrl }, '', _newUrl);
            GridPager.prototype.FindSelectedCheckbox(this);
            GridPager.prototype.GetUpdateContainerId(this);
            GridPager.prototype.RedirectToPage(this, $(this).attr("value"));
        });
    };
    GridPager.prototype.SetCustomJurl = function (requestedPage, _viewMode, url) {
        var _customUri = new CustomJurl();
        var newUrlParameter = _customUri.setQueryParameter(RecordPerPageFieldName, PageSize);
        newUrlParameter = _customUri.setQueryParameter(PageFieldName, requestedPage);
        if (_viewMode !== undefined)
            newUrlParameter = _customUri.setQueryParameter("ViewMode", _viewMode);
        if (Sort != null) {
            newUrlParameter = _customUri.setQueryParameter(SortFieldName, Sort);
            newUrlParameter = _customUri.setQueryParameter(SortDirFieldName, SortDir);
        }
        var newUrl = _customUri.build(url, newUrlParameter);
        GridPager.prototype.pagingUrlHandler(newUrl);
    };
    GridPager.prototype.SortingHandler = function (e, control) {
        e.preventDefault();
        e.stopPropagation();
        var requestedPage = $(control).closest('section').find(".pagerTxt").val();
        var url = e.currentTarget.attributes['href'].value;
        var origin = window.location.protocol + "//" + window.location.host;
        url = origin + url;
        var anchorUrl = $(control).attr('href');
        if (requestedPage != null) {
            url = url + "&" + PageFieldName + "=" + requestedPage;
        }
        GridPager.prototype.GetUpdateContainerId(control);
        GridPager.prototype.pagingUrlHandler(url);
    };
    GridPager.prototype.pagingUrlHandler = function (newUrl) {
        var formData = $(_gridContainerName + " #searchform").serialize();
        ZnodeBase.prototype.ShowLoader();
        $.ajax({
            type: "POST",
            url: newUrl,
            data: formData,
            success: (function (html) {
                GridPager.prototype.GridUpdateHandler(html);
                GridPager.prototype.SetArrows();
                GridPager.prototype.SetSelectedCheckboxChecked();
            }),
        });
    };
    GridPager.prototype.UrlHandler = function (control) {
        var MaxPages = PageCount;
        var url = window.location.protocol + "//" + window.location.host + $(control).closest('section').attr('data-pager-url'); //GridPager.prototype.GetRedirectUrl();
        var requestedPage = $(".pagerTxt").val();
        if (control.id == "pagerTxt") {
            requestedPage = control.value;
        }
        var _viewMode = $('#viewmode').attr("value");
        if (!(requestedPage > 0 && requestedPage <= MaxPages)) {
            requestedPage = 1;
        }
        var _customUri = new CustomJurl();
        var newUrlParameter = _customUri.setQueryParameter(PageFieldName, requestedPage);
        var newUrl = _customUri.build(url, newUrlParameter);
        GridPager.prototype.GetUpdateContainerId(control);
        GridPager.prototype.pagingUrlHandler(newUrl);
    };
    GridPager.prototype.SelectedPageSize = function (control) {
        var recordPerPage = $(".pageSizeList").val();
        if (control.id == "pageSizeList") {
            recordPerPage = control.value;
        }
        var url = window.location.protocol + "//" + window.location.host + $(control).closest('section').attr('data-pager-url'); // GridPager.prototype.GetRedirectUrl();
        var _viewMode = $('#viewmode').attr("value");
        var _customUri = new CustomJurl();
        var newUrlParameter = _customUri.setQueryParameter(RecordPerPageFieldName, recordPerPage);
        newUrlParameter = _customUri.setQueryParameter(PageFieldName, 1);
        newUrlParameter = _customUri.setQueryParameter("ViewMode", _viewMode);
        var newUrl = _customUri.build(url, newUrlParameter);
        GridPager.prototype.GetUpdateContainerId(control);
        GridPager.prototype.pagingUrlHandler(newUrl);
    };
    GridPager.prototype.SelectedValueHandler = function () {
        if (localStorage.getItem("selectedchkboxItems") != "") {
            var checkBoxCount = $(".grid-row-checkbox").length;
            $(".grid-row-checkbox").each(function () {
                GridPager.prototype.SetSelectedChechboxValue($(this).attr('id'));
            });
        }
    };
    GridPager.prototype.ExecuteFirstRow = function () {
        var _viewMode = $('#viewmode').attr("value");
        if (_viewMode === "Detail") {
            $("#grid").find("tr:eq(1) td a").first().click();
        }
    };
    GridPager.prototype.SetSelectedChechboxValue = function (chkboxId) {
        var checkBoxCount = $(".grid-row-checkbox").length;
        var checkBoxCheckedCount = $(".grid-row-checkbox:checked").length;
        if (checkBoxCount === checkBoxCheckedCount) {
            $("#check-all").prop('checked', true);
        }
        else {
            $("#check-all").prop('checked', false);
        }
        var selectedIds = JSON.parse(localStorage.getItem("selectedchkboxItems"));
        for (var items = 0; items < selectedIds.length; items++) {
            if (selectedIds[items] === chkboxId) {
                $("#grid #" + chkboxId + "").prop('checked', true);
            }
        }
    };
    GridPager.prototype.SetPagingValues = function () {
        PageIndex = $("#PageIndex").val();
        PageCount = $("#PageCount").val();
        PageSize = $("#PageSize").val();
        RecordPerPageFieldName = $("#RecordPerPageFieldName").val();
        PageFieldName = $("#PageFieldName").val();
        Sort = $("#Sort").val();
        SortDir = $("#SortDir").val();
        SortFieldName = $("#SortFieldName").val();
        SortDirFieldName = $("#SortDirFieldName").val();
    };
    GridPager.prototype.RedirectToPage = function (control, viewMode) {
        var MaxPages = PageCount;
        var currentPageNumber = parseInt($(control).closest("section").find("#pagerTxt").val());
        var requestedPage = currentPageNumber;
        var url = window.location.href;
        if (requestedPage <= 0) {
            requestedPage = currentPageNumber;
        }
        GridPager.prototype.SetCustomJurl(requestedPage, viewMode, url);
    };
    return GridPager;
}(ZnodeBase));
(function ($) {
    var _gridPager;
    _gridPager = new GridPager(window.document);
    if ($("#Dynamic_Grid").length > 0) {
        _gridPager.Init();
        _gridPager.SetSortableIcon();
    }
})($);
//# sourceMappingURL=GridPager.js.map