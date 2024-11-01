import { LightningElement, api } from 'lwc';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';

export default class UserConfirmationButton extends LightningElement {
  @api recordId;
  isFlowVisible = false;

  get flowInputs() {
    return [
      {
        name: "recordId",
        type: "String",
        value: this.recordId
      },
    ];
  }

  handleClick() {
    this.isFlowVisible = true;
  }

  closeModal() {
    this.isFlowVisible = false;
  }

  handleStatusChange(event) {
    if (event.detail.status === "FINISHED") {
      this.isFlowVisible = false;
      getRecordNotifyChange([{ recordId: this.recordId }]);
    }
  }
}
