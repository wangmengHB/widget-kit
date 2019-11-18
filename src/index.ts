import { Button, ButtonGroup } from './ui/button/button';
// import { CodiconLabel } from './ui/codiconLabel/codiconLabel';
import { HighlightedLabel } from './ui/highlightedlabel/highlightedLabel';
import { IconLabel } from './ui/iconLabel/iconLabel';


const container1 = document.createElement('div');
container1.style.background = '#000';
document.body.appendChild(container1);

const container2 = document.createElement('div');
document.body.appendChild(container2);


const button1 = new Button(container1, { title: true, buttonBackground: undefined, buttonHoverBackground: undefined });
const button2 = new Button(container1, { title: true, buttonBackground: undefined, buttonHoverBackground: undefined });

button1.label = 'newExtensionsButtonLabel';
button1.element.classList.add('settings-new-extensions-button');

button2.label = 'button2';
button2.element.classList.add('settings-new-extensions-button');

const primaryActions = [
  {label: 'test1'},
  {label: 'test2'},
  {label: 'test3'},
];


const buttonGroup = new ButtonGroup(container1, primaryActions.length, { title: true /* assign titles to buttons in case they overflow */ });
buttonGroup.buttons.forEach((button, index) => {
  const action = primaryActions[index];
  button.label = action.label;

  // this.inputDisposables.add(button.onDidClick(e => {
    // EventHelper.stop(e, true);

    // // Run action
    // this.actionRunner.run(action, notification);

    // // Hide notification (unless explicitly prevented)
    // if (!(action instanceof ChoiceAction) || !action.keepOpen) {
    //   notification.close();
    // }
  // }));

  // this.inputDisposables.add(attachButtonStyler(button, this.themeService));
});




// const codiconLabel = new CodiconLabel(container2);
const highlightedlabel = new HighlightedLabel(container2, true);
const iconLabel = new IconLabel(container2);




// (window as any)._label1 = codiconLabel;
(window as any)._label2 = highlightedlabel;
(window as any)._label3 = iconLabel;

(window as any)._btn = button1;
