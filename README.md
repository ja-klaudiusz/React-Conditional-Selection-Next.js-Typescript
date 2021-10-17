# React Conditional Selection (typescript)

React Conditional Selection is a useful way to build cascading select with large amount of options, categories and business rules aimed at controlling the dependencies between them.

# How it works

Business rules are defined on almost every row of data. Each time when object of selection changes, there is starting validation process. Rule decide about when option or select should render. Validation relies on comparing rules with selection object. Categories, selects or options are rendered only when its rules are matching to current object of selection.

#### Sample data object

```javascript
{
    "ENGINEVERSIONS": {
        "code": "ENGINEVERSIONS",
        "name": "Engine type",
        "options": [
            {
                "code": "GASOLINE",
                "name": "Gasoline",
                "default": null,
                "rules": null
            },
            {
                "code": "ELECTRIC",
                "name": "Electric",
                "default": null,
                "rules": null
            },
            {
                "code": "HYDROGEN",
                "name": "Hydrogen",
                "default": null,
                "rules": null
            }
        ],
        "category": {
            "name": "Technical Data",
            "code": "TECHNICAL"
        },
        "isVisible": true,
        "isRequired": true,
        "rules": null
    },
    "FUELTYPE": {
        "code": "FUELTYPE",
        "name": "Fuel type",
        "options": [
            {
                "code": "NONE",
                "name": "none",
                "default": null,
                "rules": {
                    "ENGINEVERSIONS": {
                        "$in": [
                            "ELECTRIC",
                            "HYDROGEN"
                        ]
                    }
                }
            },
            {
                "code": "PETROL",
                "name": "Petrol",
                "default": null,
                "rules": {
                    "ENGINEVERSIONS": "GASOLINE"
                }
            },
            {
                "code": "DIESEL",
                "name": "Diesel",
                "default": null,
                "rules": {
                    "ENGINEVERSIONS": "GASOLINE"
                }
            }
        ],
        "category": {
            "name": "Technical Data",
            "code": "TECHNICAL"
        },
        "isVisible": true,
        "isRequired": true,
        "rules": null
    }
}
```

#### Sample data rule object

```javascript
"rule": {
    "$or": [
        {
            "$and": [
                {
                    "FUELTYPE": {
                        "$in": [
                            "PETROL",
                            "DIESEL"
                        ]
                    }
                },
                {
                    "EQUIPMENTLINE": "AMG"
                }
            ]
        },
        {
            "EQUIPMENTLINE": "AMGPLUS"
        }
    ]
}
```

#### Sample selection object

```javascript
 "selection": {
        "EQUIPMENTLINE": "AMGPLUS",
        "EQUIPMENTPACKAGE": "5",
        "AIRBAGS": "MORE",
        "ENGINEVERSIONS": "GASOLINE",
        "FUELTYPE": "PETROL",
        "UPHLOSTERYGROUP": "RAX",
        "UPHLOSTERYINTERIOR": "RAX123"
 }
```

Try it on CodeSandbox [React Conditional Selection (typescript)](#)
