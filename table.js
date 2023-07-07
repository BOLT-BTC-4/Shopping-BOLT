import uuid from "react-native-uuid";

const masterItemTable = [
  {
    corner: "野菜",
    itemName: "玉ねぎ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "かぼちゃ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "じゃがいも",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "ナス",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "オクラ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "ピーマン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "パプリカ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "さつまいも",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "にんじん",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "レンコン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "トマト",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "ゴーヤ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "野菜",
    itemName: "ズッキーニ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "果物",
    itemName: "リンゴ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "果物",
    itemName: "バナナ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "果物",
    itemName: "ぶどう",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "果物",
    itemName: "みかん",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "果物",
    itemName: "オレンジ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "果物",
    itemName: "スイカ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "果物",
    itemName: "メロン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お肉",
    itemName: "鶏肉",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "豚肉",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "牛肉",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "鶏胸肉",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "鶏もも肉",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "ささみ",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "牛タン",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "牛バラ",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "豚バラ",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "お肉",
    itemName: "ミンチ",
    quantity: 200,
    unit: "g",
  },
  {
    corner: "卵",
    itemName: "卵",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "卵",
    itemName: "うずらの卵",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "卵",
    itemName: "温泉卵",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "サンマ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "マグロ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "サバ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "アジ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "カレイ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "サーモン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "鮭",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "ホッケ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "刺し身",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お魚",
    itemName: "アナゴ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "乳製品",
    itemName: "ヨーグルト",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "乳製品",
    itemName: "チーズ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "乳製品",
    itemName: "牛乳",
    quantity: 1000,
    unit: "g",
  },
  {
    corner: "乳製品",
    itemName: "さけるチーズ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "乳製品",
    itemName: "バター",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "乳製品",
    itemName: "生クリーム",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "アイス",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "冷凍枝豆",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "冷凍ブロッコリー",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "シーフードミックス",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "冷凍餃子",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "冷凍チャーハン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "冷凍パスタ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "冷凍ラーメン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "ガリガリ君",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "冷凍野菜",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "冷凍",
    itemName: "冷凍コロッケ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "大豆類",
    itemName: "納豆",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "大豆類",
    itemName: "豆腐",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "大豆類",
    itemName: "厚揚げ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "大豆類",
    itemName: "大豆",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お菓子",
    itemName: "ポテチ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お菓子",
    itemName: "チョコ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お菓子",
    itemName: "せんべい",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お菓子",
    itemName: "ガム",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お菓子",
    itemName: "じゃがりこ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "パン",
    itemName: "食パン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "パン",
    itemName: "クリームパン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "パン",
    itemName: "いちごパン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "パン",
    itemName: "フランスパン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "パン",
    itemName: "スティックパン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "ジャム",
    itemName: "いちごジャム",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "ジャム",
    itemName: "ブルーベリージャム",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "ジャム",
    itemName: "マーマレード",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "ジャム",
    itemName: "はちみつ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "ジャム",
    itemName: "シナモンシュガー",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "お米",
    itemName: "米",
    quantity: 10,
    unit: "kg",
  },
  {
    corner: "無洗米",
    itemName: "米",
    quantity: 10,
    unit: "kg",
  },
  {
    corner: "玄米",
    itemName: "米",
    quantity: 10,
    unit: "kg",
  },
  {
    corner: "麺類",
    itemName: "パスタ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "麺類",
    itemName: "うどん",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "麺類",
    itemName: "ラーメン",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "麺類",
    itemName: "そば",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "麺類",
    itemName: "そうめん",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "惣菜",
    itemName: "コロッケ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "惣菜",
    itemName: "からあげ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "惣菜",
    itemName: "ポテサラ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "惣菜",
    itemName: "きんぴら",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "惣菜",
    itemName: "ひじきの煮物",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "調味料",
    itemName: "胡椒",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "調味料",
    itemName: "塩",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "調味料",
    itemName: "醤油",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "調味料",
    itemName: "みりん",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "調味料",
    itemName: "酒",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "調味料",
    itemName: "味噌",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "調味料",
    itemName: "油",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "飲料・酒",
    itemName: "ビール",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "飲料・酒",
    itemName: "水",
    quantity: 2,
    unit: "l",
  },
  {
    corner: "飲料・酒",
    itemName: "お茶",
    quantity: 2,
    unit: "l",
  },
  {
    corner: "飲料・酒",
    itemName: "ハイボール",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "飲料・酒",
    itemName: "日本酒",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "日用品",
    itemName: "ごみ袋",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "日用品",
    itemName: "ぞうきん",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "日用品",
    itemName: "洗剤",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "日用品",
    itemName: "ティッシュ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "日用品",
    itemName: "トイレットペーパー",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "生活雑貨",
    itemName: "フライ返し",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "生活雑貨",
    itemName: "お玉",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "健康",
    itemName: "サプリメント",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "健康",
    itemName: "青汁",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "介護・ベビー",
    itemName: "おむつ",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "介護・ベビー",
    itemName: "ミルク",
    quantity: 1,
    unit: "個",
  },
  {
    corner: "介護・ベビー",
    itemName: "ベビーパウダー",
    quantity: 1,
    unit: "個",
  },
];

const masterCornerTable = [
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
    id: uuid.v4(),
    corner: "野菜",
    itemName: "玉ねぎ",
    quantity: 2,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    id: uuid.v4(),
    corner: "お肉",
    itemName: "合いびき肉",
    quantity: 600,
    unit: "g",
    directions: 1,
    check: false,
  },
  {
    id: uuid.v4(),
    corner: "卵",
    itemName: "卵",
    quantity: 300,
    unit: "g",
    directions: 1,
    check: false,
  },
  {
    id: uuid.v4(),
    corner: "お肉",
    itemName: "豚バラ肉",
    quantity: 800,
    unit: "g",
    directions: 1,
    check: false,
  },
  {
    id: uuid.v4(),
    corner: "野菜",
    itemName: "しいたけ",
    quantity: 4,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    id: uuid.v4(),
    corner: "野菜",
    itemName: "もやし",
    quantity: 2,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    id: uuid.v4(),
    corner: "野菜",
    itemName: "ゴボウ",
    quantity: 1,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    id: uuid.v4(),
    corner: "野菜",
    itemName: "にんじん",
    quantity: 2,
    unit: "個",
    directions: 1,
    check: false,
  },
  {
    id: uuid.v4(),
    corner: "調味料",
    itemName: "唐辛子",
    quantity: 1,
    unit: "個",
    directions: 1,
    check: false,
  },
];

const defaultShopTable = [
  {
    id: "1",
    shopName: "カネスエ江南店",
    corner: ["お肉", "果物", "野菜", "卵", "お菓子", "お魚"],
  },
  {
    id: "2",
    shopName: "バロー安城店",
    corner: ["お魚", "お菓子", "卵", "お肉", "野菜", "果物"],
  },
  {
    id: "3",
    shopName: "イオン熱田店",
    corner: ["野菜", "お魚", "お肉", "果物", "お菓子", "卵", "調味料"],
  },
  // {
  //   key: "4",
  //   value: "イオン安城店",
  //   corners: ["乳製品", "冷凍", "大豆類"],
  // },
  // {
  //   key: "5",
  //   value: "世界のメグリアカルフォルニア店",
  //   corners: ["パン", "ジャム", "お米"],
  // },
  // {
  //   key: "6",
  //   value: "ドン・キホーテ豊田店",
  //   corners: ["麺類", "惣菜", "調味料"],
  // },
  // {
  //   key: "7",
  //   value: "世界一のスーパメグリア",
  //   corners: ["飲料・酒", "日用品", "生活雑貨", "健康", "介護・ベビー"],
  // },
];

const defaultSelectdMenu = {
  "2023-06-28": [
    {
      id: uuid.v4(),
      category: "主食",
      recipeName: "俺のチャーハン",
      url: "https://www.kurashiru.com/recipes/fdf4cc7f-7275-45e7-b49b-df889fc19df6",
      serving: 4,
      like: 0,
      //1人前にしたitems
      items: [
        {
          id: uuid.v4(),
          checked: true,
          itemName: "卵",
          quantity: 2,
          unit: "個",
        },
        {
          id: uuid.v4(),
          checked: true,
          itemName: "豚肉",
          quantity: 300,
          unit: "g",
        },
      ],
    },
    {
      id: uuid.v4(),
      category: "主菜",
      recipeName: "俺のからあげ",
      url: "https://dig-zamas.com/",
      defaultServing: 4,
      like: 0,
      items: [
        {
          id: uuid.v4(),
          checked: true,
          itemName: "卵",
          quantity: 2,
          unit: "個",
        },
        {
          id: uuid.v4(),
          checked: true,
          itemName: "豚肉",
          quantity: 300,
          unit: "g",
        },
      ],
    },
  ],
};
// "2023-06-29": [
//   {
//     id: uuid.v4(),
//     category: "主菜",
//     recipeName: "俺の卵焼き",
//     url: "https://www.kurashiru.com/recipes/fdf4cc7f-7275-45e7-b49b-df889fc19df6",
//     defaultServing: 4,
//     like: 0,
//     items: [
//       {
//         id: uuid.v4(),
//         checked: true,
//         itemName: "卵",
//         quantity: 2,
//         unit: "個",
//       },
//       {
//         id: uuid.v4(),
//         checked: true,
//         itemName: "豚肉",
//         quantity: 300,
//         unit: "g",
//       },
//     ],
//   },
//   {
//     id: uuid.v4(),
//     category: "汁物",
//     recipeName: "具だくさん味噌汁",
//     url: "https://cpoint-lab.co.jp/article/202011/17618/",
//     defaultServing: 4,
//     like: 0,
//     items: [
//       {
//         id: uuid.v4(),
//         checked: true,
//         itemName: "ナス",
//         quantity: 3,
//         unit: "個",
//       },
//       {
//         id: uuid.v4(),
//         checked: true,
//         itemName: "鶏肉",
//         quantity: 200,
//         unit: "g",
//       },
//     ],
//   },
// ],
//   "2023-06-30": [
//     {
//       id: uuid.v4(),
//       category: "主食",
//       recipeName: "俺のチャーハン",
//       url: "https://dig-zamas.com/",
//       defaultServing: 4,
//       like: 0,
//       items: [
//         {
//           id: uuid.v4(),
//           checked: true,
//           itemName: "にんじん",
//           quantity: 2,
//           unit: "個",
//         },
//         {
//           id: uuid.v4(),
//           checked: true,
//           itemName: "牛タン",
//           quantity: 300,
//           unit: "g",
//         },
//       ],
//     },
//     {
//       id: uuid.v4(),
//       category: "主菜",
//       recipe: "俺のからあげ",
//       url: "https://dig-zamas.com/",
//       defaultServing: 4,
//       like: 0,
//       items: [
//         {
//           id: uuid.v4(),
//           checked: true,
//           itemName: "卵",
//           quantity: 2,
//           unit: "個",
//         },
//         {
//           id: uuid.v4(),
//           checked: true,
//           itemName: "豚肉",
//           quantity: 300,
//           unit: "g",
//         },
//       ],
//     },
//   ],
//   "2023-07-01": [
//     {
//       id: uuid.v4(),
//       category: "主菜",
//       recipe: "俺のハンバーグ",
//       url: "https://cpoint-lab.co.jp/article/202011/17618/",
//       defaultServing: 4,
//       like: 0,
//       items: [
//         {
//           id: uuid.v4(),
//           checked: true,
//           itemName: "トマト",
//           quantity: 2,
//           unit: "個",
//         },
//         {
//           id: uuid.v4(),
//           checked: true,
//           itemName: "合いびき肉",
//           quantity: 300,
//           unit: "g",
//         },
//       ],
//     },
//     {
//       id: uuid.v4(),
//       category: "汁物",
//       recipe: "わかめの味噌汁",
//       url: "https://cpoint-lab.co.jp/article/202011/17618/",
//       defaultServing: 4,
//       like: 0,
//       items: [
//         {
//           id: uuid.v4(),
//           checked: true,
//           itemName: "ナス",
//           quantity: 2,
//           unit: "個",
//         },
//         {
//           id: uuid.v4(),
//           checked: true,
//           itemName: "味噌",
//           quantity: 300,
//           unit: "g",
//         },
//       ],
//     },
//   ],
// };

const defaultRecipes = [
  {
    id: uuid.v4(),
    category: "主食",
    recipe: "わかめご飯",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 0,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "わかめ",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "ご飯",
        quantity: 300,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "主食",
    recipe: "たけのこ飯",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 1,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "たけのこ",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "ご飯",
        quantity: 300,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "主菜",
    recipe: "私のハンバーグ",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 2,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "にんじん",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "鶏胸肉",
        quantity: 300,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "主菜",
    recipe: "私のホイル焼き",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 0,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "マグロ",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "豚肉",
        quantity: 300,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "主菜",
    recipe: "私のカレー",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 0,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "じゃがいも",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "にんじん",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "豚肉",
        quantity: 300,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "主菜",
    recipe: "私のオムレツ",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 0,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "卵",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "ブロッコリー",
        quantity: 300,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "主菜",
    recipe: "私の蒸し焼き",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 1,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "トマト",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "豚バラ",
        quantity: 300,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "副菜",
    recipe: "私のきんぴら",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 2,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "にんじん",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "ごま",
        quantity: 30,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "副菜",
    recipe: "私のひじき煮",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 0,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "納豆",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "ひじき",
        quantity: 200,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "汁物",
    recipe: "私の豚汁",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 0,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "こんにゃく",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "味噌",
        quantity: 30,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "汁物",
    recipe: "私の芋汁",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 1,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "じゃがいも",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "味噌",
        quantity: 200,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "その他",
    recipe: "私のスムージ",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 3,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "バナナ",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "ごま",
        quantity: 30,
        unit: "g",
      },
    ],
  },
  {
    id: uuid.v4(),
    category: "その他",
    recipe: "私のチーズケーキ",
    url: "https://dig-zamas.com/",
    serving: 4,
    like: 0,
    items: [
      {
        id: uuid.v4(),
        checked: true,
        itemName: "チーズ",
        quantity: 2,
        unit: "個",
      },
      {
        id: uuid.v4(),
        checked: true,
        itemName: "牛乳",
        quantity: 200,
        unit: "g",
      },
    ],
  },
];

export const table = {
  masterItem: masterItemTable,
  masterCorner: masterCornerTable,
  defaultItems: defaultItemsTable,
  defaultShops: defaultShopTable,
  defaultMenu: defaultSelectdMenu,
  defaultRecipes: defaultRecipes,
};
