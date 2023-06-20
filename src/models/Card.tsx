class Card {
  id: string;
  title: string;
  displayTitle: string;
  sortTitle: string;
  type: string;
  subtype: string;
  side: string;
  imageUrl: string;

  constructor(object) {
    this.id = object.id.toString();
    this.title = object.front.title;
    this.displayTitle = object.front.title.split(' / ')[0].replaceAll('<>', '◇');
    this.sortTitle = object.front.title.replaceAll('<>', '').replaceAll('•', '');
    this.type = object.front.type;
    this.subtype = object.front.subtype;
    this.side = object.side;
    this.imageUrl = object.front.imageUrl;
  }
}

export default Card;
