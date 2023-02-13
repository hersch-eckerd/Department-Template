module.exports = {
    "name": "DepartmentTemplate",
    "publisher": "EckerdCollege",
    "cards": [{
        "type": "DepartmentTemplate",
        "source": "./src/cards/DepartmentTemplateCard",
        "title": "Department Template",
        "displayCardType": "DepartmentTemplate",
        "description": "Card Description",
        "configuration": {
            "client": [{
                "key": "organization",
                "label": "Name of Organization",
                "type": "text",
                "required":true,
                "default":"Organization test"
            }, {
                "key": "summary",
                "label": "Short Summary of Department",
                "type": "text",
                "required": true,
                "default":"Summary Test"
            }, {
                "key": "description",
                "label": "Long Description of Department",
                "type": "text",
                "required": true,
                "default":"description test"
            }, {
                "key": "directory",
                "label": "Show directory?",
                "type": "boolean"
            }, {
                "key": "codeGroup",
                "label": "Banner Code Group?",
                "type": "text"
            } ]
        },
        "template": {
            "icon": "institution",
            "title": "Department Template",
            "description": "Provides the ability to create custom department cards"
        },
        "pageRoute": {
            "route":"/"
        }
    }],
    "page": {
        "source": "./src/page/router.jsx"
    }
}