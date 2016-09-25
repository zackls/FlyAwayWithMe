var input = document.getElementById('ajax');
var myList = document.getElementById('airports');
var arrAirports = [{"Airport": "Aberdeen, SD (ABR)", "Airport Code":"ABR"},
                       {"Airport": "Abilene, TX (ABI)", "Airport Code":"ABI"},
                       {"Airport": "Adak Island, AK (ADK)", "Airport Code":"ADK"},
                       {"Airport": "Akiachak, AK (KKI)", "Airport Code":"KKI"},
                       {"Airport": "Akiak, AK (AKI)", "Airport Code":"AKI"},
                       {"Airport": "Akron/Canton, OH (CAK)", "Airport Code":"CAK"},
                       {"Airport": "Akuton, AK (KQA)", "Airport Code":"KQA"},
                       {"Airport": "Alakanuk, AK (AUK)", "Airport Code":"AUK"},
                       {"Airport": "Alamogordo, NM (ALM)", "Airport Code":"ALM"},
                       {"Airport": "Alamosa, CO (ALS)", "Airport Code":"ALS"},
                       {"Airport": "Albany, NY (ALB)", "Airport Code":"ALB"},
                       {"Airport": "Albany, OR - Bus service (CVO)", "Airport Code":"CVO"},
                       {"Airport": "Albany, OR - Bus service (QWY)", "Airport Code":"QWY"},
                       {"Airport": "Albuquerque, NM (ABQ)", "Airport Code":"ABQ"},
                       {"Airport": "Aleknagik, AK (WKK)", "Airport Code":"WKK"},
                       {"Airport": "Alexandria, LA (AEX)", "Airport Code":"AEX"},
                       {"Airport": "Allakaket, AK (AET)", "Airport Code":"AET"},
                       {"Airport": "Allentown, PA (ABE)", "Airport Code":"ABE"},
                       {"Airport": "Alliance, NE (AIA)", "Airport Code":"AIA"},
                       {"Airport": "Alpena, MI (APN)", "Airport Code": "APN"},
                       {"Airport": "Altoona, PA (AOO)", "Airport Code": "AOO"},
                       {"Airport": "Amarillo, TX (AMA)", "Airport Code": "AMA"},
                       {"Airport": "Ambler, AK (ABL)", "Airport Code": "ABL"},
                       {"Airport": "Anaktueuk, AK (AKP)", "Airport Code": "AKP"},
                       {"Airport": "Anchorage, AK (ANC)", "Airport Code": "ANC"},
                       {"Airport": "Angoon, AK (AGN)", "Airport Code": "AGN"},
                       {"Airport": "Aniak, AK (ANI)", "Airport Code": "ANI"},
                       {"Airport": "Anvik, AK (ANV)", "Airport Code": "ANV"},
                       {"Airport": "Appleton, WI (ATW)", "Airport Code": "ATW"},
                       {"Airport": "Arcata, CA (ACV)", "Airport Code": "ACV"},
                       {"Airport": "Arctic Village, AK (ARC)", "Airport Code": "ARC"},
                       {"Airport": "Asheville, NC (AVL)", "Airport Code": "AVL"},
                       {"Airport": "Ashland, KY/Huntington, WV (HTS)", "Airport Code": "HTS"},
                       {"Airport": "Aspen, CO (ASE)", "Airport Code": "ASE"},
                       {"Airport": "Athens, GA (AHN)", "Airport Code": "AHN"},
                       {"Airport": "Atka, AK (AKB)", "Airport Code": "AKB"},
                       {"Airport": "Atlanta, GA (ATL)", "Airport Code": "ATL"},
                       {"Airport": "Atlantic City, NJ (AIY)", "Airport Code": "AIY"},
                       {"Airport": "Atqasuk, AK (ATK)", "Airport Code": "ATK"},
                       {"Airport": "Augusta, GA (AGS)", "Airport Code": "AGS"},
                       {"Airport": "Augusta, ME (AUG)", "Airport Code": "AUG"},
                       {"Airport": "Austin, TX (AUS)", "Airport Code": "AUS"}
                       ];
function createJSON() {
    var strPorts = '';
    arrAirports.forEach(function(x) {
        var option = document.createElement('option');
        strPorts += '<option value = "' +x["Airport"] + '"/>';
    });
    document.getElementById("airports").innerHTML = strPorts;
}

createJSON();