// constants/Error.ts
export const ERROR_MSG = {
    IMGs_NOT_LOADED_YET: "Images not loaded yet. Initializing loadImages...",

    COMPONENT_ATTRIBUTE_REQUIRED: (
        attributeName: string,
        componentName: string,
    ): string =>
        `Attribute '${attributeName}' is required on <${componentName}> component.`,

    COMPONENT_ATTRIBUTE_MISSING: (attributeName: string): string =>
        `Error: '${attributeName}' attribute is missing.`,

    IMG_NAME_NOT_FOUND: (imageName: string): string =>
        `Image with name "${imageName}" not found.`,
};

export type ErrorConstants = typeof ERROR_MSG;
