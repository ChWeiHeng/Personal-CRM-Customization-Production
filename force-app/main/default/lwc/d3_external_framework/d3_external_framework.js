import { LightningElement, api, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import d3 from '@salesforce/resourceUrl/d3';

export default class D3_external_framework extends LightningElement {

    renderedCallback() {
        Promise.all([
            loadScript(this, d3 + '/d3.min.js')
        ]).then(() => {
            // D3.js loaded successfully
        }).catch(error => {
            // Error loading D3.js
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An error occurred while loading D3.js',
                    variant: 'error'
                })
            );
        });
    }

    constructor() {
        super();
        this.svgWidth = 500;
        this.svgHeight = 300;
    }
    
    createChart() {
        const svg = d3.select('.chart-container')
            .append('svg')
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight);
    
        // More D3.js code here
    }

}