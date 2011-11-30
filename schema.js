module.exports = {
    'type': 'object',
    'properties': {
        // Mapnik-specific properties.
        'srs': {
            'type': 'string',
            'required': true
        },
        'Stylesheet': {
            'type': ['object', 'array'],
            'required': true
        },
        'Layer': {
            'type': ['object', 'array'],
            'required': true
        },

        // TileMill-specific properties. @TODO these need a home, see
        // https://github.com/mapbox/tilelive-mapnik/issues/4
        'format': {
            'type': 'string',
            'enum': ['png', 'png24', 'png8', 'jpeg80', 'jpeg85',
                'jpeg90', 'jpeg95']
        },
        'interactivity': {
            'type': ['object', 'boolean']
        },

        // TileJSON properties.
        'name':        { 'type': 'string' },
        'description': { 'type': 'string' },
        'version':     {
            'type': 'string',
            'description': 'Semver compatible version string.',
            'pattern': '\\d+\\.\\d+\\.\\d+\\w?[\\w\\d]*'
        },
        'attribution': { 'type': 'string' },
        'legend':      { 'type': 'string' },
        'minzoom': {
            'minimum': 0,
            'maximum': 22,
            'type': 'integer'
        },
        'maxzoom': {
            'minimum': 0,
            'maximum': 22,
            'type': 'integer'
        },
        'bounds': {
            'type': 'array',
            'minItems': 4,
            'maxItems': 4,
            'items': [
                { 'type':'number', 'minimum': -180, 'maximum':180 },
                {
                    'type':'number',
                    'minimum': -85.05112877980659,
                    'maximum': 85.05112877980659 },
                { 'type':'number', 'minimum': -180, 'maximum':180 },
                {
                    'type':'number',
                    'minimum': -85.05112877980659,
                    'maximum': 85.05112877980659 }
            ]
        },
        'center': {
            'type': 'array',
            'minItems': 3,
            'maxItems': 3,
            'items': [
                { 'type':'number', 'minimum':-180, 'maximum':180 },
                {
                    'type':'number',
                    'minimum':-85.05112877980659,
                    'maximum':85.05112877980659 },
                { 'type':'integer', 'minimum':0, 'maximum':22 }
            ]
        },

        // Non-stored properties.
        // @TODO make this writable at some point
        'scheme': {
            'type': 'string',
            'ignore': true
        },
        // @TODO make this writable at some point
        'formatter': {
            'type': 'string',
            'ignore': true
        },
        'tilejson': {
            'type': 'string',
            'ignore': true
        },
        'tiles': {
            'type': 'array',
            'required': true,
            'items': { 'type': 'string' },
            'ignore': true
        },
        'grids': {
            'type': 'array',
            'items': { 'type': 'string' },
            'ignore': true
        },
        '_updated': {
            'type': 'integer',
            'description': 'Last update time of project',
            'ignore': true
        },
        'id': {
            'type': 'string',
            'required': true,
            'pattern': '^[A-Za-z0-9\-_]+$',
            'title': 'Filename',
            'description': 'Filename may include alphanumeric characters, dashes and underscores.',
            'ignore': true
        }
    }
};
