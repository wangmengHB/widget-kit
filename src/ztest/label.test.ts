import { CodiconLabel } from '../ui/label/codiconLabel';
import { HighlightedLabel } from '../ui/label/highlightedLabel';
import { IconLabel } from '../ui/label/iconLabel';


const container1 = document.createElement('div');
document.body.appendChild(container1);

const container2 = document.createElement('div');
document.body.appendChild(container2);

const container3 = document.createElement('div');
document.body.appendChild(container3);




const codiconLabel = new CodiconLabel(container1);
const highlightedlabel = new HighlightedLabel(container2, true);
const iconLabel = new IconLabel(container3);




(window as any)._label1 = codiconLabel;
(window as any)._label2 = highlightedlabel;
(window as any)._label3 = iconLabel;