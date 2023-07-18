import { Observable, Application } from '@nativescript/core'
import { InAppBrowser } from "nativescript-inappbrowser";
export class HelloWorldModel extends Observable {
  private _counter: number
  private _message: string

  constructor() {
    super()

    // Initialize default values.
    this._counter = 42
    this.updateMessage()
  }

  get message(): string {
    return this._message
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value
      this.notifyPropertyChange('message', value)
    }
  }

  onTap() {
    this._counter--
    this.updateMessage();

    console.log("App", Application.getRootView());
    InAppBrowser.isAvailable().then( available=> {
      if(available) {
      return InAppBrowser.open("https://www.google.com", {
          // iOS Properties
          dismissButtonStyle: "done",
          preferredBarTintColor: "#025f99",
          preferredControlTintColor: "white",
          readerMode: false,
          animated: false,
          modalPresentationStyle: "fullScreen",
          modalTransitionStyle: "coverVertical",
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: "#025f99",
          secondaryToolbarColor: "white",
          enableUrlBarHiding: false,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
      
      });
  } else {
      alert({
          title: "Not Available",
          message: "Not Available",
          okButtonText: "Ok"
      })
  }
    }).catch(e=> console.error("Error", e));

  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!'
    } else {
      this.message = `${this._counter} taps left`
    }
  }
}
