export class DirectionUtils {
  static setDirection(direction: string) {
    switch (direction) {
      case 'EE':
        return '동향';
      case 'WW':
        return '서향';
      case 'SS':
        return '남향';
      case 'NN':
        return '북향';
      case 'EN':
        return '북동향';
      case 'WN':
        return '북서향';
      case 'ES':
        return '남동향';
      case 'WS':
        return '남서향';
    }
  }
}
