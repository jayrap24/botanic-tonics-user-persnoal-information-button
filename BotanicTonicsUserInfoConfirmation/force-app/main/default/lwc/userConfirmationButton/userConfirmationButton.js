import { LightningElement, api, track } from 'lwc';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
// import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi'

export default class UserConfirmationButton extends LightningElement {
  @api recordId;
  // @track isFlowVisible = false;
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
      // window.location.reload();
      // Notify Salesforce to refresh the record data
      getRecordNotifyChange([{ recordId: this.recordId }]);
      // notifyRecordUpdateAvailable({ recordId: this.recordId });
    }
  }
}
