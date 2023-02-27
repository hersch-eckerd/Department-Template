module.exports = {
    "name": "OrganizationTemplate",
    "publisher": "EckerdCollege",
    "cards": [{
        "type": "OrganizationTemplate",
        "source": "./src/cards/DepartmentTemplateCard",
        "title": "Organization Template",
        "displayCardType": "Organization",
        "description": "Provides the ability to create custom Organization cards",
        "template": {
            "icon": "institution",
            "title": "Eckerd Organization",
            "description": "Provides the ability to create custom Organization cards"
        },
        "customConfiguration": {
            "source": "./src/cards/DepartmentTemplateCardConfig.jsx"
        },
        "pageRoute": {
            "route":"/"        }
    }],
    "page": {
        "source": "./src/page/router.jsx"
    }
}