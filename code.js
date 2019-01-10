/***********************************************************************
Copyright 2018 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Note that these code samples being shared are not official Google
products and are not formally supported.
***********************************************************************/

/**
 * Setup custom menu for the sheet.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('DCM Functions')
      .addItem('Setup Sheets', 'setupTabs')
      .addSeparator()
      .addItem('List Sites', 'listSites')
      .addSeparator()
      .addItem('Bulk Create Campaigns', 'createCampaigns')
      .addItem('Bulk Create Placements', 'createPlacements')
      .addItem('Bulk Create Ads', 'createAds')
      .addItem('Bulk Create Creatives', 'createCreatives')
      .addItem('Bulk Create Landing Pages', 'createLandingPages')
      .addToUi();
}

/**
 * Using DCM API list all the sites this profile has added
 * and print them out on the sheet.
 */
function listSites() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SITES_SHEET);
  var profileID = _fetchProfileId();
  initializeSheet_(SITES_SHEET, true);

  // setup header row
  sheet.getRange('A1')
      .setValue('Site Name')
      .setFontWeight('bold')
      .setBackground('#a4c2f4');
  sheet.getRange('B1')
      .setValue('Directory Site ID')
      .setFontWeight('bold')
      .setBackground('#a4c2f4');

  var sites = DoubleClickCampaigns.Sites.list(profileID).sites;
  for (var i = 0; i < sites.length; i++) {
    var currentObject = sites[i];
    var rowNum = i+2;
    sheet.getRange('A' + rowNum)
        .setValue(currentObject.name)
        .setBackground('lightgray');
    sheet.getRange('B' + rowNum)
        .setNumberFormat('@')
        .setValue(currentObject.directorySiteId)
        .setBackground('lightgray');
  }
}

/**
 * Read campaign information from the sheet and use DCM API to bulk create them
 * in the DCM Account.
 */
function createCampaigns() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CAMPAIGNS_SHEET);
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) { // exclude header row
    var newCampaign = _createOneCampaign(ss, values[i]);
    var rowNum = i+1;
    sheet.getRange('F' + rowNum)
        .setValue(newCampaign.id)
        .setBackground('lightgray');
  }
  SpreadsheetApp.getUi().alert('Finished creating campaigns!');
}

/**
 * Read placement information from the sheet and use DCM API to bulk create them
 * in the DCM Account.
 */
function createPlacements() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(PLACEMENTS_SHEET);
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) { // skip header row
    var newPlacement = _createOnePlacement(ss, values[i]);
    var rowNum = i+1;
    sheet.getRange('J' + rowNum)
        .setValue(newPlacement.id)
        .setBackground('lightgray');
  }
  SpreadsheetApp.getUi().alert('Finished creating the placements!');
}

/**
 * Read campaign ads from the sheet and use DCM API to bulk create them
 * in the DCM Account.
 */
function createAds() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(ADS_SHEET);
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) { // exclude header row
    var newAd = _createOneAd(ss, values[i]);
    var rowNum = i+1;
    sheet.getRange('I' + rowNum)
        .setValue(newAd.id)
        .setBackground('lightgray');
  }

  SpreadsheetApp.getUi().alert('Finished creating the ads!');
}

/**
 * Read creatives information from the sheet and use DCM API to bulk create them
 * in the DCM Account.
 */
function createCreatives() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CREATIVES_SHEET);
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) { // exclude header row
    var newCreative = _createOneCreative(ss, values[i]);
    var rowNum = i+1;
    sheet.getRange('H' + rowNum)
        .setValue(newCreative.id)
        .setBackground('lightgray');
  }

  SpreadsheetApp.getUi().alert('Finished creating the creatives!');
}

/**
 * Read landing pages information from the sheet and use DCM API to bulk create them
 * in the DCM Account.
 */
function createLandingPages() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(LANDING_PAGES_SHEET);
  var values = sheet.getDataRange().getValues();
  
  for (var i = 1; i < values.length; i++) { // exclude header row
    var newLandingPage = _createOneLandingPage(ss, values[i]);
    var rowNum = i+1;
    sheet.getRange('D' + rowNum)
        .setValue(newLandingPage.id)
        .setBackground('lightgray');
  }
  
  SpreadsheetApp.getUi().alert('Finished creating the landing pages!');
}

/**
 * A helper function which creates one campaign via DCM API using information
 * from the sheet.
 * @param {object} ss Spreadsheet class object representing
 * current active spreadsheet
 * @param {Array} singleCampaignArray An array containing campaign information
 * @return {object} Campaign object
 */
function _createOneCampaign(ss, singleCampaignArray){
  var profileID = _fetchProfileId();

  var advertiserId = singleCampaignArray[0];
  var name = singleCampaignArray[1];
  var defaultLandingPageId = singleCampaignArray[2];
  var startDate = Utilities.formatDate(
      singleCampaignArray[3], ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
  var endDate = Utilities.formatDate(
      singleCampaignArray[4], ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');

  var campaignResource = {
    "kind": "dfareporting#campaign",
    "advertiserId": advertiserId,
    "name": name,
    "startDate": startDate,
    "endDate": endDate,
    "defaultLandingPageId":defaultLandingPageId
  };
  var newCampaign = DoubleClickCampaigns.Campaigns
      .insert(campaignResource, profileID);
  return newCampaign;
}

/**
 * A helper function which creates one creative via DCM API using information
 * from the sheet.
 * @param {object} ss Spreadsheet class object representing
 * current active spreadsheet
 * @param {Array} singleCreativeArray An array containing creative information
 * @return {object} Creative object
 */
function _createOneCreative(ss, singleCreativeArray){
  var profileID = _fetchProfileId();

  var advertiserId = singleCreativeArray[0];
  var name = singleCreativeArray[1];
  var width = singleCreativeArray[2];
  var height = singleCreativeArray[3];
  var creativeType = singleCreativeArray[4];
  var assetType = singleCreativeArray[5];
  var assetName = singleCreativeArray[6];

  var creativeResource =  {
    "name": name,
    "advertiserId": advertiserId,
    "size": {
      "width": width,
      "height": height
    },
    "active": true,
    "type": creativeType,
    "creativeAssets": [
      {
        "assetIdentifier": {
          "type": assetType,
          "name": assetName
        }
      }
    ]
  };

  var newCreative = DoubleClickCampaigns.Creatives
      .insert(creativeResource, profileID);
  return newCreative;

}

/**
 * A helper function which creates one ad via DCM API using information
 * from the sheet.
 * @param {object} ss Spreadsheet class object representing
 * current active spreadsheet
 * @param {Array} singleAdArray An array containing ad information
 * @return {object} Ad object
 */
function _createOneAd(ss, singleAdArray){
  var profileID = _fetchProfileId();

  var campaignId = singleAdArray[0];
  var name = singleAdArray[1];

  var startTime = Utilities.formatDate(
      singleAdArray[2], ss.getSpreadsheetTimeZone(),
      'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');

  var endTime = Utilities.formatDate(
      singleAdArray[3], ss.getSpreadsheetTimeZone(),
      'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');

  var impressionRatio = singleAdArray[4];
  var priority = singleAdArray[5];
  var type = singleAdArray[6];
  var placementId = singleAdArray[7];

  //https://developers.google.com/doubleclick-advertisers/v3.1/ads
  //priority requires double digit format even for values lower than 10
  //e.g. AD_PRIORITY_03
  if(priority<10){
    priority = "0"+priority;
  }

  var adResource = {
      "kind": "dfareporting#ad",
      "campaignId":campaignId,
      "name": name,
      "startTime": startTime ,
      "endTime": endTime,
      "deliverySchedule":{
        "impressionRatio":impressionRatio,
        "priority":"AD_PRIORITY_"+priority
      },
      "type":type
    };

  adResource.placementAssignments = [{"placementId":placementId}];

  var newAd = DoubleClickCampaigns.Ads.insert(
    adResource, profileID);
  return newAd;
}

/**
 * A helper function which creates one placement via DCM API using information
 * from the sheet.
 * @param {object} ss Spreadsheet class object representing current active
 * spreadsheet
 * @param {Array} singlePlacementArray An array containing
 * placement information
 * @return {object} Placement object
 */
function _createOnePlacement(ss, singlePlacementArray) {
  var profileID = _fetchProfileId();

  var campaignID = singlePlacementArray[0];
  var name = singlePlacementArray[1];
  var siteId = singlePlacementArray[2];
  var paymentSource = 'PLACEMENT_AGENCY_PAID';
  var compatibility = (singlePlacementArray[3]).trim().toUpperCase();
  var size = singlePlacementArray[4];
  var sizeSplitted = size.split('x');

  var pricingScheduleStartDate = Utilities.formatDate(
      singlePlacementArray[5], ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
  var pricingScheduleEndDate = Utilities.formatDate(
      singlePlacementArray[6], ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
  var pricingSchedulePricingType = singlePlacementArray[7];
  var tagFormats = (singlePlacementArray[8]).split(',');
  for (var i = 0; i < tagFormats.length; i++) {
    tagFormats[i] = (tagFormats[i].trim()).replace(/\r?\n|\r/g, ', ');
  }

  var placementResource = {
    "kind": "dfareporting#placement",
    "campaignId": campaignID,
    "name": name,
    "directorySiteId": siteId,
    "paymentSource": paymentSource,
    "compatibility": compatibility,
    "size": {
      "width": sizeSplitted[0].trim(),
      "height": sizeSplitted[1].trim()
    },
    "pricingSchedule": {
      "startDate": pricingScheduleStartDate,
      "endDate": pricingScheduleEndDate,
      "pricingType": pricingSchedulePricingType
    },
    "tagFormats": tagFormats
  };

  var newPlacement = DoubleClickCampaigns.Placements
      .insert(placementResource, profileID);
  return newPlacement;
}

/**
 * A helper function which creates one landing page via DCM API using information
 * from the sheet.
 * @param {object} ss Spreadsheet class object representing current active
 * spreadsheet
 * @param {Array} singleLandingPageArray An array containing
 * landing page information
 * @return {object} Landing Page object
 */
function _createOneLandingPage(ss, singleLandingPageArray) {
  var profileID = _fetchProfileId();
  
  var advertiserId = singleLandingPageArray[0];
  var name = singleLandingPageArray[1];
  var url = singleLandingPageArray[2];
  
  var landingPageResource = {
    "advertiserId": advertiserId,
    "kind": "dfareporting#landingPage",
    "name": name,
    "url": url
  }
  
  var newLandingPage = DoubleClickCampaigns.AdvertiserLandingPages
      .insert(landingPageResource, profileID);
  return newLandingPage;
}
