export class HeatingAndCoolingUtils {
  static systemTypeMap: { [key: string]: string } = {
    HT001: '중앙난방',
    HT002: '개별난방',
    HT003: '지역난방',
  };

  static energyTypeMap: { [key: string]: string } = {
    HF001: '도시가스',
    HF002: '전기',
    HF003: '기름/등유',
    HF004: '지열',
  };
}
