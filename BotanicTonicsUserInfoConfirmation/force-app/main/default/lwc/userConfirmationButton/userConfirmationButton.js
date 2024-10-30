import { LightningElement, api, track } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class UserConfirmationButton extends LightningElement {
  @api recordId;
  @track isFlowVisible = false;

  // Prepare flow input variable for recordId
  get flowInputs() {
    return [
      {
        name: "recordId",
        type: "String",
        value: this.recordId
      }
    ];
  }

  // Show the modal with the flow
  handleClick() {
    this.isFlowVisible = true;
  }

  // Close the modal without affecting the flow
  closeModal() {
    this.isFlowVisible = false;
  }

  // Handle Confirm button click to continue to the next step in the flow
  handleConfirm() {
    const flowElement = this.template.querySelector("lightning-flow");
    flowElement.dispatchEvent(new FlowNavigationNextEvent());
  }

  // Close modal when flow finishes
  handleStatusChange(event) {
    if (event.detail.status === "FINISHED") {
      this.isFlowVisible = false;
    }
  }
}
