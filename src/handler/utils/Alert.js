import {
  ALERT_DEFAULT_CONFIG,
  ALERT_WARNING,
  ALERT_INFO,
  ALERT_ERROR,
  ALERT_SUCCESS
} from "./constants";

class Alert {
  static warning(message, config) {
    this.create(message, ALERT_WARNING, config);
  }

  static error(message, config) {
    this.create(message, ALERT_ERROR, config);
  }

  static info(message, config) {
    this.create(message, ALERT_INFO, config);
  }

  static success(message, config) {
    this.create(message, ALERT_SUCCESS, config);
  }

  static create(message, options, config = ALERT_DEFAULT_CONFIG) {
    const app = document.getElementById("app");
    const { type, icon } = options;
    const iconNode = this.getIcon(icon);
    const messageNode = this.getMessage(message);
    const btnCloseNode = this.getBtn();
    const alertNode = document.createElement("div");
    alertNode.className = `alert alert--${type}`;
    alertNode.appendChild(iconNode);
    alertNode.appendChild(messageNode);
    alertNode.appendChild(btnCloseNode);
    if (config.manyInstances === false)
      document.querySelectorAll(".alert").forEach(a => {
        a.remove();
      });
    app.appendChild(alertNode);
    if (config.disableAutoClose === false)
      setTimeout(() => {
        if (app.contains(alertNode)) app.removeChild(alertNode);
      }, config.autoClose);
  }

  static getIcon(icon) {
    const iconNode = document.createElement("i");
    iconNode.className = `alert__icon ${icon}`;
    return iconNode;
  }

  static getMessage(message) {
    const messageNode = document.createElement("span");
    messageNode.className = "alert__message";
    const messageTxtNode = document.createTextNode(message);
    messageNode.appendChild(messageTxtNode);
    return messageNode;
  }

  static getBtn() {
    const btnNode = document.createElement("div");
    btnNode.className = "alert__button";
    btnNode.setAttribute("type", "alert__button");
    const btnIcon = document.createElement("i");
    btnIcon.className = "fa fa-close";
    btnNode.addEventListener("click", e => {
      if (e.target.parentNode && e.target.parentNode.parentNode)
        document
          .getElementById("app")
          .removeChild(e.target.parentNode.parentNode);
    });
    btnNode.appendChild(btnIcon);
    return btnNode;
  }
}

export default Alert;
