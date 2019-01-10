**_Disclaimer:These code samples being shared are not official Google_**
**_products and are not formally supported._**

# **DCM Bulk Trafficking Tool**

An example tool to perform bulk tasks using DCM API.

## OVERVIEW

This AppScript-based tool lets you use a Google Spreadsheet to perform bulk
tasks including - Bulk Create Campaigns - Bulk Create
Placements - Bulk Create Ads - Bulk Create Creatives - Bulk Create Landing Pages.

It uses DCM APIs to pull and push data to DCM.

The same result could be achieved by manually creating each entities through the
DCM UI, but the tool leverages the APIs and Spreadsheet functionalities to
automate the most of manual steps.

In order to use this tool you need to have valid access to the **DoubleClick
Campaign Manager APIs** through your Google Account, and you will need to enable
that API in a Google Cloud Project so that you can authenticate the
tool (see the corresponding step of Initial Setup section below).

## INITIAL SETUP

*   Create a new [Google Spreadsheet](https://sheets.google.com) and open its
    script editor (from _Tools > Script Editor_)
    -   Copy the code from code.js and utils.js in two corresponding code.gs,
        utilities.gs files in your AppScript project
    -   Enable DCM API _Resources > Advanced Google Services_ and enable the
        _DCM/DFA Reporting and Trafficking API (v3.1)_
    -   Click on _Google API Console link_ at the bottom of _Advanced Google
        Services_ window to open the Google Cloud Platform project, select
        _Library_ from the left hand menu, then search and enable the DCM API in
        the project
*   Close the script editor and spreadsheet tabs both (this is necessary so the
    custom functions appear)
*   Re-open the Go back to the Spreadsheet, click on the _DCM Functions_ menu
    and select _Setup Sheets_ for the initial tabs and header rows setup (wait
    for the script to finish)
*   Remove any tab not needed (aside from the ones created by script)
*   Input the DCM Profile ID in the setup tab (i.e. at cell C5) then select
    _Data_ from the sheet menu and select _Named Ranges...._ to set the title
    _DCMUserProfileID_ and value _Setup!C5_

## USAGE

*   As general rules
    *   Only manually edit columns with green headers.
    *   Columns with blue headers will be auto-populated.
    *   Columns with a header* means it's required, otherwise optional
*   **List Sites** get all the sites this profile has added and populate them
    in _Sites_ tab (this tab is for read-only purpose, so do not
    edit it).
*   **Bulk Create Campaigns** Fill out the tab _Campaigns_ with campaign
    information, then select "Bulk Create Campaigns" from DCM
    Functions menu.
*   **Bulk Create Placements** Fill out the tab _Placements_ then
    select "Bulk Create Placements" from DCM Functions menu.
*   **Bulk Create Ads** Fill out the tab _Ads_ then select "Bulk
    Create Ads" from DCM Functions menu.
*   **Get All Creatives** Fill out the tab _Creatives_ then select "Bulk
    Create Creatives" from DCM Functions menu.
*   **Bulk Create Landing Pages** Fill out the tab _LandingPages_ then 
    select "Bulk Create Landing Pages" from DCM Functions menu.

## CELL FORMATTING

Some of the columns require exact format to be used. Below you can find a list
of all requirements:

*  Date and date time columns should be formatted using date or date time
   formats (see _Format>Number>Date_ or _Date time_ in the top menu bar)
*  _Placements_ tab
   * _Compatibility_ column - acceptable values are:
     * APP
     * APP_INTERSTITIAL
     * DISPLAY
     * DISPLAY_INTERSTITIAL
     * IN_STREAM_AUDIO
     * IN_STREAM_VIDEO
   * _Pricing Schedule Pricing Type_ column - acceptable values are:
     * PRICING_TYPE_CPA
     * PRICING_TYPE_CPC
     * PRICING_TYPE_CPM
     * PRICING_TYPE_CPM_ACTIVEVIEW
     * PRICING_TYPE_FLAT_RATE_CLICKS
     * PRICING_TYPE_FLAT_RATE_IMPRESSIONS
   * _Tag Formats column_ - acceptable values are:
     * PLACEMENT_TAG_STANDARD
     * PLACEMENT_TAG_IFRAME_JAVASCRIPT
     * PLACEMENT_TAG_IFRAME_ILAYER
     * PLACEMENT_TAG_INTERNAL_REDIRECT
     * PLACEMENT_TAG_JAVASCRIPT
     * PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT
     * PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT
     * PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT
     * PLACEMENT_TAG_CLICK_COMMANDS
     * PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH
     * PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3
     * PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4
     * PLACEMENT_TAG_TRACKING
     * PLACEMENT_TAG_TRACKING_IFRAME
     * PLACEMENT_TAG_TRACKING_JAVASCRIPT
*  _Ads_ tab
   * _Impression Ratio_ column - acceptable values are 1 to 10, inclusive
   * _Priority column_ - acceptable values are 1 to 16, inclusive
   * _Type_ column - acceptable values are:
     * AD_SERVING_CLICK_TRACKER
     * AD_SERVING_DEFAULT_AD
     * AD_SERVING_STANDARD_AD
     * AD_SERVING_TRACKING
*  _Creatives_ tab
   * _Creative Type_ column - acceptable values are:
     * BRAND_SAFE_DEFAULT_INSTREAM_VIDEO
     * CUSTOM_DISPLAY
     * CUSTOM_DISPLAY_INTERSTITIAL
     * DISPLAY
     * DISPLAY_IMAGE_GALLERY
     * DISPLAY_REDIRECT
     * FLASH_INPAGE
     * HTML5_BANNER
     * IMAGE
     * INSTREAM_AUDIO
     * INSTREAM_VIDEO
     * INSTREAM_VIDEO_REDIRECT
     * INTERNAL_REDIRECT
     * INTERSTITIAL_INTERNAL_REDIRECT
     * RICH_MEDIA_DISPLAY_BANNER
     * RICH_MEDIA_DISPLAY_EXPANDING
     * RICH_MEDIA_DISPLAY_INTERSTITIAL
     * RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL
     * RICH_MEDIA_IM_EXPAND
     * RICH_MEDIA_INPAGE_FLOATING
     * RICH_MEDIA_MOBILE_IN_APP
     * RICH_MEDIA_PEEL_DOWN
     * TRACKING_TEXT
     * VPAID_LINEAR_VIDEO
     * VPAID_NON_LINEAR_VIDEO
   * _Creative Asset Type_ column - acceptable values are:
     * AUDIO
     * FLASH
     * HTML
     * HTML_IMAGE
     * IMAGE
     * VIDEO
