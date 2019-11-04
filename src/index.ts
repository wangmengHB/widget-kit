import { Button, ButtonGroup } from './ui/button/button';

export const says = 'this is a experiment project. feature will be added later.';

console.log(says);

const container = document.createElement('div');
container.style.background = '#000';
document.body.appendChild(container);


const button1 = new Button(container, { title: true, buttonBackground: undefined, buttonHoverBackground: undefined });
const button2 = new Button(container, { title: true, buttonBackground: undefined, buttonHoverBackground: undefined });

button1.label = 'newExtensionsButtonLabel';
button1.element.classList.add('settings-new-extensions-button');

button2.label = 'button2';
button2.element.classList.add('settings-new-extensions-button');

const primaryActions = [
  {label: 'test1'},
  {label: 'test2'},
  {label: 'test3'},
];


const buttonGroup = new ButtonGroup(container, primaryActions.length, { title: true /* assign titles to buttons in case they overflow */ });
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



(window as any)._btn = button1;
