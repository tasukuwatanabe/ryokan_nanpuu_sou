export const roomList = [
  {
    id: 1,
    name: "梅の間",
    price: 19800,
    description:
      "梅の木が多い庭園を望む部屋で、春には花の香りが心地よい癒しを提供します。",
    image: "example_1.jpg",
    capacity: 5,
  },
  {
    id: 2,
    name: "楓の間",
    price: 32800,
    description:
      "部屋から一望できる楓の紅葉は、秋の深まりと共に訪れる者の心を和ませます。",
    image: "example_2.jpg",
    capacity: 8,
  },
  {
    id: 3,
    name: "橘の間",
    price: 49800,
    description:
      "橘の花が満開の季節には、その甘い香りで部屋全体が優しく包まれます。",
    image: "example_2.jpg",
    capacity: 10,
  },
  {
    id: 4,
    name: "葵の間",
    price: 22800,
    description:
      "静かな庭を見渡せる部屋で、葵の花が季節の移り変わりを色鮮やかに演出します。",
    image: "example_3.jpg",
    capacity: 7,
  },
  {
    id: 5,
    name: "椎の間",
    price: 17800,
    description:
      "椎木の緑に囲まれた部屋からは、四季の変化を感じながら穏やかな休息が得られます。",
    image: "example_4.jpg",
    capacity: 4,
  },
  {
    id: 6,
    name: "桧扇の間",
    price: 26800,
    description:
      "桧扇の木々に囲まれたこの部屋では、自然の息吹を感じながらのんびりと過ごせます。",
    image: "example_1.jpg",
    capacity: 9,
  },
  {
    id: 7,
    name: "紫陽花の間",
    price: 12600,
    description:
      "紫陽花が咲き誇る庭園を望む部屋は、雨の日でも風情ある美しさを楽しめます。",
    image: "example_2.jpg",
    capacity: 3,
  },
  {
    id: 8,
    name: "牡丹の間",
    price: 45800,
    description:
      "牡丹の花が一面に咲く庭を持つ部屋で、豪華な雰囲気の中での滞在を約束します。",
    image: "example_3.jpg",
    capacity: 11,
  },
  {
    id: 9,
    name: "茜の間",
    price: 27800,
    description:
      "夕日が美しい茜の間では、一日の終わりにゆったりとした時間を過ごせます。",
    image: "example_4.jpg",
    capacity: 6,
  },
  {
    id: 10,
    name: "霞の間",
    price: 4980,
    description:
      "朝の霞がかかる景色を望む部屋で、新しい一日の始まりに最適な環境を提供します。",
    image: "example_1.jpg",
    capacity: 5,
  },
  {
    id: 11,
    name: "雲の間",
    price: 25800,
    description:
      "雲が流れる空を眺めることができる部屋で、心穏やかな時間を過ごせます。",
    image: "example_2.jpg",
    capacity: 4,
  },
  {
    id: 12,
    name: "星の間",
    price: 36800,
    description:
      "夜空の星を望む部屋。星々が織りなす光景に心洗われる静寂な夜を。",
    image: "example_3.jpg",
    capacity: 2,
  },
  {
    id: 13,
    name: "月の間",
    price: 47800,
    description:
      "月明かりが部屋を照らす、ロマンチックな雰囲気の中で特別な夜を楽しめます。",
    image: "example_4.jpg",
    capacity: 2,
  },
  {
    id: 14,
    name: "雪の間",
    price: 21800,
    description:
      "雪景色が窓から望める部屋。冬の静けさと美しさが心を落ち着かせます。",
    image: "example_1.jpg",
    capacity: 3,
  },
  {
    id: 15,
    name: "風の間",
    price: 19800,
    description:
      "そよ風が心地よい部屋。自然の風が空間全体を通り抜け、リラックスを誘います。",
    image: "example_2.jpg",
    capacity: 5,
  },
  {
    id: 16,
    name: "波の間",
    price: 28800,
    description:
      "海の波の音が聞こえる部屋。波音に包まれて、穏やかな睡眠をお楽しみください。",
    image: "example_3.jpg",
    capacity: 6,
  },
  {
    id: 17,
    name: "岩の間",
    price: 34800,
    description:
      "岩山を望む部屋で、大自然の迫力と美しさを体感できる壮大な眺めです。",
    image: "example_4.jpg",
    capacity: 4,
  },
  {
    id: 18,
    name: "竹の間",
    price: 22800,
    description:
      "竹林に囲まれた部屋。竹の緑が目に優しく、心を穏やかに保つ空間です。",
    image: "example_1.jpg",
    capacity: 7,
  },
  {
    id: 19,
    name: "松の間",
    price: 33800,
    description:
      "松の木々が四季を通じて色々な表情を見せる部屋。自然の息吹を感じられます。",
    image: "example_2.jpg",
    capacity: 8,
  },
  {
    id: 20,
    name: "花の間",
    price: 19800,
    description:
      "四季折々の花が咲き誇る庭を望む部屋。季節の移り変わりを感じさせます。",
    image: "example_3.jpg",
    capacity: 6,
  },
];

export const reservationList = [
  {
    id: 1,
    roomId: 1,
    checkInDate: new Date("2024-09-07"),
    checkOutDate: new Date("2024-09-09"),
  },
  {
    id: 2,
    roomId: 2,
    checkInDate: new Date("2024-08-01"),
    checkOutDate: new Date("2024-08-03"),
  },
  {
    id: 3,
    roomId: 3,
    checkInDate: new Date("2024-09-02"),
    checkOutDate: new Date("2024-09-03"),
  },
  {
    id: 4,
    roomId: 4,
    checkInDate: new Date("2024-08-04"),
    checkOutDate: new Date("2024-08-05"),
  },
  {
    id: 5,
    roomId: 5,
    checkInDate: new Date("2024-09-10"),
    checkOutDate: new Date("2024-09-12"),
  },
  {
    id: 6,
    roomId: 6,
    checkInDate: new Date("2024-09-19"),
    checkOutDate: new Date("2024-09-22"),
  },
  {
    id: 7,
    roomId: 7,
    checkInDate: new Date("2024-08-13"),
    checkOutDate: new Date("2024-08-14"),
  },
  {
    id: 8,
    roomId: 8,
    checkInDate: new Date("2024-09-13"),
    checkOutDate: new Date("2024-09-15"),
  },
  {
    id: 9,
    roomId: 9,
    checkInDate: new Date("2024-08-25"),
    checkOutDate: new Date("2024-08-28"),
  },
  {
    id: 10,
    roomId: 10,
    checkInDate: new Date("2024-09-22"),
    checkOutDate: new Date("2024-09-25"),
  },
  {
    id: 11,
    roomId: 11,
    checkInDate: new Date("2024-09-17"),
    checkOutDate: new Date("2024-09-20"),
  },
  {
    id: 12,
    roomId: 12,
    checkInDate: new Date("2024-09-11"),
    checkOutDate: new Date("2024-09-14"),
  },
  {
    id: 13,
    roomId: 13,
    checkInDate: new Date("2024-09-20"),
    checkOutDate: new Date("2024-09-21"),
  },
  {
    id: 14,
    roomId: 14,
    checkInDate: new Date("2024-09-07"),
    checkOutDate: new Date("2024-09-09"),
  },
  {
    id: 15,
    roomId: 15,
    checkInDate: new Date("2024-08-04"),
    checkOutDate: new Date("2024-08-05"),
  },
  {
    id: 16,
    roomId: 16,
    checkInDate: new Date("2024-09-04"),
    checkOutDate: new Date("2024-09-05"),
  },
  {
    id: 17,
    roomId: 17,
    checkInDate: new Date("2024-08-19"),
    checkOutDate: new Date("2024-08-21"),
  },
  {
    id: 18,
    roomId: 18,
    checkInDate: new Date("2024-08-23"),
    checkOutDate: new Date("2024-08-24"),
  },
  {
    id: 19,
    roomId: 19,
    checkInDate: new Date("2024-08-12"),
    checkOutDate: new Date("2024-08-15"),
  },
  {
    id: 20,
    roomId: 20,
    checkInDate: new Date("2024-08-29"),
    checkOutDate: new Date("2024-08-31"),
  },
];
