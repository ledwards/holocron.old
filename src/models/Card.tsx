import ExpansionSets from '../../data/ExpansionSets.json'

class Card {
  id: string;
  title: string;
  displayTitle: string;
  sortTitle: string;
  type: string;
  displayType: string;
  subType: string;
  displaySubType: string;
  side: string;
  setNumber: string;
  set: string;
  rarity: string;
  imageUrl: string;

  constructor(object) {
    this.id = object.id.toString();
    this.title = object.front.title;
    this.displayTitle = `${object.front.title.split(' / ')[0].replaceAll('<>', '◇')}${object.front.title.includes(' / ') && object.front.title.includes('(V)') ? ' (V)' : ''}`;
    this.sortTitle = object.front.title.replaceAll('<>', '').replaceAll('•', '');
    this.type = object.front.type;
    this.displayType = object.front.type.split(' #')[0];
    this.subType = object.front.subtype;
    this.displaySubType = object.front.subType ? object.front.subType.split(': ')[0] : '';
    this.side = object.side;
    this.setNumber = object.set;
    this.set = ExpansionSets[object.set];
    this.rarity = object.rarity;
    this.imageUrl = object.front.imageUrl;
  }
}

export default Card;
