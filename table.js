import uuid from "react-native-uuid";

const masterItemTable = [
  {
    sales: "野菜",
    itemName: "玉ねぎ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "かぼちゃ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "じゃがいも",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "ナス",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "オクラ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "ピーマン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "パプリカ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "さつまいも",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "にんじん",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "レンコン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "トマト",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "ゴーヤ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "野菜",
    itemName: "ズッキーニ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "果物",
    itemName: "リンゴ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "果物",
    itemName: "バナナ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "果物",
    itemName: "ぶどう",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "果物",
    itemName: "みかん",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "果物",
    itemName: "オレンジ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "果物",
    itemName: "スイカ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "果物",
    itemName: "メロン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お肉",
    itemName: "鶏肉",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "豚肉",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "牛肉",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "鶏胸肉",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "鶏もも肉",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "ささみ",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "牛タン",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "牛バラ",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "豚バラ",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "お肉",
    itemName: "ミンチ",
    quantity: 200,
    unit: "g",
  },
  {
    sales: "卵",
    itemName: "卵",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "卵",
    itemName: "うずらの卵",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "卵",
    itemName: "温泉卵",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "サンマ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "マグロ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "サバ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "アジ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "カレイ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "サーモン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "鮭",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "ホッケ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "刺し身",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お魚",
    itemName: "アナゴ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "乳製品",
    itemName: "ヨーグルト",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "乳製品",
    itemName: "チーズ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "乳製品",
    itemName: "牛乳",
    quantity: 1000,
    unit: "g",
  },
  {
    sales: "乳製品",
    itemName: "さけるチーズ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "乳製品",
    itemName: "バター",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "乳製品",
    itemName: "生クリーム",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "アイス",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "冷凍枝豆",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "冷凍ブロッコリー",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "シーフードミックス",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "冷凍餃子",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "冷凍チャーハン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "冷凍パスタ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "冷凍ラーメン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "ガリガリ君",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "冷凍野菜",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "冷凍",
    itemName: "冷凍コロッケ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "大豆類",
    itemName: "納豆",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "大豆類",
    itemName: "豆腐",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "大豆類",
    itemName: "厚揚げ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "大豆類",
    itemName: "大豆",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お菓子",
    itemName: "ポテチ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お菓子",
    itemName: "チョコ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お菓子",
    itemName: "せんべい",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お菓子",
    itemName: "ガム",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お菓子",
    itemName: "じゃがりこ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "パン",
    itemName: "食パン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "パン",
    itemName: "クリームパン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "パン",
    itemName: "いちごパン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "パン",
    itemName: "フランスパン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "パン",
    itemName: "スティックパン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "ジャム",
    itemName: "いちごジャム",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "ジャム",
    itemName: "ブルーベリージャム",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "ジャム",
    itemName: "マーマレード",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "ジャム",
    itemName: "はちみつ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "ジャム",
    itemName: "シナモンシュガー",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "お米",
    itemName: "米",
    quantity: 10,
    unit: "kg",
  },
  {
    sales: "無洗米",
    itemName: "米",
    quantity: 10,
    unit: "kg",
  },
  {
    sales: "玄米",
    itemName: "米",
    quantity: 10,
    unit: "kg",
  },
  {
    sales: "麺類",
    itemName: "パスタ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "麺類",
    itemName: "うどん",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "麺類",
    itemName: "ラーメン",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "麺類",
    itemName: "そば",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "麺類",
    itemName: "そうめん",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "惣菜",
    itemName: "コロッケ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "惣菜",
    itemName: "からあげ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "惣菜",
    itemName: "ポテサラ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "惣菜",
    itemName: "きんぴら",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "惣菜",
    itemName: "ひじきの煮物",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "調味料",
    itemName: "胡椒",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "調味料",
    itemName: "塩",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "調味料",
    itemName: "醤油",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "調味料",
    itemName: "みりん",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "調味料",
    itemName: "酒",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "調味料",
    itemName: "味噌",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "調味料",
    itemName: "油",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "飲料・酒",
    itemName: "ビール",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "飲料・酒",
    itemName: "水",
    quantity: 2,
    unit: "l",
  },
  {
    sales: "飲料・酒",
    itemName: "お茶",
    quantity: 2,
    unit: "l",
  },
  {
    sales: "飲料・酒",
    itemName: "ハイボール",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "飲料・酒",
    itemName: "日本酒",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "日用品",
    itemName: "ごみ袋",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "日用品",
    itemName: "ぞうきん",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "日用品",
    itemName: "洗剤",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "日用品",
    itemName: "ティッシュ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "日用品",
    itemName: "トイレットペーパー",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "生活雑貨",
    itemName: "フライ返し",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "生活雑貨",
    itemName: "お玉",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "健康",
    itemName: "サプリメント",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "健康",
    itemName: "青汁",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "介護・ベビー",
    itemName: "おむつ",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "介護・ベビー",
    itemName: "ミルク",
    quantity: 1,
    unit: "個",
  },
  {
    sales: "介護・ベビー",
    itemName: "ベビーパウダー",
    quantity: 1,
    unit: "個",
  },
];

const masterCornerTable = [
  "売場を選択してください",
  "野菜",
  "果物",
  "お肉",
  "卵",
  "お魚",
  "乳製品",
  "冷凍",
  "大豆類",
  "お菓子",
  "パン",
  "ジャム",
  "お米",
  "麺類",
  "惣菜",
  "調味料",
  "飲料・酒",
  "日用品",
  "生活雑貨",
  "健康",
  "介護・ベビー",
];

const defaultItemsTable = [
  {
    localId: uuid.v4(),
    sales: "野菜",
    itemName: "玉ねぎ",
    quantity: 2,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    localId: uuid.v4(),
    sales: "果物",
    itemName: "リンゴ",
    quantity: 1,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    localId: uuid.v4(),
    sales: "お肉",
    itemName: "鶏肉",
    quantity: 300,
    unit: "g",
    directions: 1,
    check: false,
  },
  {
    localId: uuid.v4(),
    sales: "卵",
    itemName: "卵",
    quantity: 1,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    localId: uuid.v4(),
    sales: "お魚",
    itemName: "サンマ",
    quantity: 3,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    localId: uuid.v4(),
    sales: "お菓子",
    itemName: "ポテチ",
    quantity: 30,
    unit: "個",
    directions: 1,
    check: false,
  },
];

export const table = {
  masterItem: masterItemTable,
  masterCorner: masterCornerTable,
  defaultItems: defaultItemsTable,
};
