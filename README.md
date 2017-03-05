# Instagram Photo Wall

This is a plugin for Hexo to pull in your own images from Instagram.

Before you can use this plugin, you must [obtain an access token from Instagram](http://jelled.com/instagram/access-token).

## Usage

To use, install as usual on your Hexo site:

`npm install hexo-instagram-wall --save`

Then, follow these steps:

1. In your `_config.yml`, make settings for this plugin like this:  

    ```yaml  
    instagramWall:  
      enable: true  
    ```
1. Save your access token as an environment variable named `INSTAGRAM_WALL_TOKEN`. Optionally, you can save this in your `_config.yml`:  

    ```yaml  
    instagramWall:  
      enable: true  
      access_token: XXXXXXXXX  
    ```
1. (Optional) Create your display settings. If you create settings here, they will be used for all instances of Instagram Wall on your website. However, you can also override these settings for each instance you create (see the next step for details).  

    ```yaml  
    instagramWall:  
      enable: true  
      requestedCount: 18  
      itemsPerRow: 3  
      showCaption: true  
      displayStyle: 'flex' | 'column' | 'custom'  
      gutterSize: '10px'  
      overlayColor: 'black'  
      textColor: 'white'  
    ```
1. Add the tag to your template:  
    `<%- instagramWall() ->`  
    Or, override default display settings:  
    `<%- instagramWall(requestedCount, itemsPerRow, showCaption, overlayColor, textColor, displayStyle, gutterSize) ->`  
    For example, to show 5 items in a single column whilst hiding the captions:  
    `<%- instagramWall(5, 1, false) ->`  

## Description of option settings

The globally defined settings are used for all instances of Instagram Wall that you put in your template files. However, you can override these settings for each individual usage. (See the Usage directions above).

Since the settings can be overridden for each usage, it is possible for you to add as many instances of this plugin on each page as you need. For example, one wall can be added to a sidebar on your website, and another can be added to the main content area.

1. `requestedCount` - The number of items to pull from Instagram. The maximum number is 20 items.  
    default: 20  
    valid options: any number from 1-20  
1. `itemsPerRow` - The number of items to show in each horizontal row.  
    default: 3  
    valid options: any number  
1. `showCaption` - Whether you want to show captions.  
    default: true  
    valid options: true or false  
1. `displayStyle` - The type of inline CSS added to the wall. Flex setting uses flexbox, Column setting uses CSS columns, and Custom setting does not apply any inline CSS.  
    default: flex  
    valid options: flex, column, custom  
1. `gutterSize` - Defines the amount of spacing between row items.  
    default: 10px  
    valid options: Any amount of spacing, including the units.  
1. `overlayColor` - The background color for the caption. This setting is only useful if `showCaption` is `true`.  
    default: black  
    valid options: Any string value for a color. You can pick a named color, hex, rgb, rgba, hsla, etc.  
1. `textColor` - The text color for the caption. This setting is only useful if `showCaption` is `true`.  
    default: white  
    valid options: Any string value for a color. You can pick a named color, hex, rgb, rgba, hsla, etc.  
