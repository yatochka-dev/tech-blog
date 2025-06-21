import {lexicalEditor, LinkFeature} from "@payloadcms/richtext-lexical";

export const editor = lexicalEditor({
    features: ({defaultFeatures, rootFeatures}) => [

        ...defaultFeatures,
        ...rootFeatures,

        LinkFeature({
            // Example showing how to customize the built-in fields
            // of the Link feature
            fields: ({defaultFields}) => [
                ...defaultFields,
                {
                    name: 'rel',
                    label: 'Rel Attribute',
                    type: 'select',
                    hasMany: true,
                    options: ['noopener', 'noreferrer', 'nofollow'],
                    admin: {
                        description:
                            'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                    },
                },
            ],
        }),
    ]
})