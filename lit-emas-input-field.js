// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

// Extend the LitElement base class
class MyElement extends LitElement {
  static get styles() { 
    return css `
    :host { display: block; }

    .alert { 
      color: var(--alert-color, red);
    }

    .title { 
      color: var(--title-color, rgb(102, 102, 102));
      font-size: var(--title-font-size, 16px);
      text-align: var(--title-text-align, left);
    }
    
    #litEmasInputField { 
      font-family: var(--litEmasInputField-font, 'Roboto', sans-serif);
      border-style: var(--litEmasInputField-border-style, solid);
      border-width: var(--litEmasInputField-border-width, 1px);
      border-color: var(--litEmasInputField-border-color, rgb(102, 102, 102));
      display: var(--litEmasInputField-display, block);
      overflow: hidden;
      background-color: var(--litEmasInputField-background-color, transparent);
    }

    .content { 
      margin-left: 5px;
      margin-right: 5px;
    }

    .mainInput { 
      display: flex;
    }

    .inputField { 
      flex-grow: 1;
      border: var(--inputField-border, 1px solid black);
      border-radius: var(--inputField-border-radius, 2px);
      padding: var(--inputField-padding, 5px 5px);
    }

    .submitButton { 
      margin-left: 5px;
      border: var(--submitButton-border, 1px solid grey);
      border-radius: var(--submitButton-border-radius, 2px);
      background-color: var(--submitButton-background-color, rgb(221, 221, 221));
      color: var(--submitButton-color, black);
      font-size: var(--submitButton-font-size, 13px);
      width: var(--submitButton-width, auto);
    }

    .submitButton:active { 
      transform: translateY(1px);
    }

    .displayedInputdataField { 
      border-style: var(--displayedInputdataField-border-style, solid);
      border-width: var(--displayedInputdataField-border-width, 1px);
      border-color: var(--displayedInputdataField-border-color, rgb(102, 102, 102));
      background-color: var(--displayedInputdataField-background-color, transparent);
      padding: 5px 5px;
      margin-top: 5px;
    }

    .displayedInputdata {  
      color: var(--displayedInputdata-color, black);
      font-size: var(--displayedInputdata-font-size, 16px);
      text-align: var(--displayedInputdata-text-align, left);
    }

    .clearButton { 
      float: right;
      margin-bottom: 5px;
      border: var(--clearButton-border, 1px solid grey);
      border-radius: var(--clearButton-border-radius, 2px);
      background-color: var(--clearButton-background-color, rgb(221, 221, 221));
      color: var(--clearButton-color, black);
      font-size: var(--clearButton-font-size, 13px);
      width: var(--clearButton-width, auto);
    }
    
    `;
  }

  static get properties() { return { 
      fieldName: { type: String },
      placeholderText: { type: String },
      displayedInputdata: { type: String },
      dropdownValues: { type: Array },
      dropdownValueRequired: { type: Boolean },
      displayDropdownValueRequiredMessage: { type: Boolean },
      maxCharacters: { type: Number },
      maxCharactersBoolean: { type: Boolean },
    }; 
  }

  constructor() { 
    super();
    this.fieldName = 'Input field';
    this.placeholderText = 'Please fill in'
    this.displayedInputdata = 'Submit data to change this text';
    this.dropdownValues = [];
    this.dropdownValueRequired = false;
    this.displayDropdownValueRequiredMessage = false;
    this.maxCharacters = undefined;
    this.maxCharactersBoolean = false;
  }

  submitData() {
    var inputData = this.shadowRoot.getElementById("inputField").value; 
    if (inputData && !this.dropdownValueRequired) { 
      if (inputData.length > this.maxCharacters) { 
        this.maxCharactersBoolean = true;
      } else {
        this.displayedInputdata = inputData;
        this.shadowRoot.getElementById("inputField").value = "";
        this.maxCharactersBoolean = false;
      }
    } else if (inputData && this.dropdownValueRequired) {
        if (this.dropdownValues.includes(inputData)) {
          if (inputData.length > this.maxCharacters) { 
            this.maxCharactersBoolean = true;
          } else { 
            this.displayedInputdata = inputData;
            this.shadowRoot.getElementById("inputField").value = "";
            this.displayDropdownValueRequiredMessage = false;
          }  
        } else { 
          this.displayDropdownValueRequiredMessage = true;
        }
    }   
  }

  // clearData() {
  //   var inputData = this.shadowRoot.getElementById("inputField").value; 
  //   if (inputData) { 
  //     this.shadowRoot.getElementById("inputField").value = "";
  //   }
  // }

  clearDisplayedInputdata() { 
    this.displayedInputdata = ""
  }

  render(){ 
    return html`
      <!-- Input field dropdown -->
      <div id="litEmasInputField">
        <div class="content">
          <p class="title">${this.fieldName}</p>

          <div class="mainInput">
            <input id="inputField" class="inputField" placeholder="${this.placeholderText}" type="search" list="data"></input>

            ${this.dropdownValues? 
            html `
            <datalist id="data">
              ${this.dropdownValues.map(i => html`<option value=${i}>`)}
            </datalist>` : 
            html ``}

            <button class="submitButton" @click=${this.submitData}>Submit</button>
          </div>

          ${this.displayDropdownValueRequiredMessage?
          html `
          <p class="alert">Please choose a value from the dropdown</p>` : 
          html ``}

          ${this.maxCharactersBoolean?
          html `
          <p class="alert">Please submit something less than ${this.maxCharacters} characters long</p>` : 
          html ``}

          <!-- <button @click=${this.clearData}><i class="fa fa-close"></i>Clear</button> -->
          <div class="displayedInputdataField">
            <p class=displayedInputdata>${this.displayedInputdata}</p> 
          </div>
          <p><button class="clearButton" @click=${this.clearDisplayedInputdata}>Clear text</button></p>
      
        </div>
      </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define('lit-emas-input-field', MyElement);