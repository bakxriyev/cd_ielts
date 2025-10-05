export enum ReadingQuestionType {
  TRUE_FALSE_NOT_GIVEN = "TRUE_FALSE_NOT_GIVEN", // ha/yo‘q/berilmagan
  YES_NO_NOT_GIVEN = "YES_NO_NOT_GIVEN", // Yes/No/Not Given (muallif fikri asosida)
  
  MULTIPLE_CHOICE_SINGLE = "MULTIPLE_CHOICE_SINGLE", // 1 ta variant tanlash
  MULTIPLE_CHOICE_MULTI = "MULTIPLE_CHOICE_MULTI", // bir nechta variant tanlash

  MATCHING_HEADINGS = "MATCHING_HEADINGS", // paragraflarga sarlavha moslash
  MATCHING_INFORMATION = "MATCHING_INFORMATION", // paragraflarga faktlarni moslash
  MATCHING_FEATURES = "MATCHING_FEATURES", // shaxslar, joylar, narsalar bilan moslash
  MATCHING_SENTENCE_ENDINGS = "MATCHING_SENTENCE_ENDINGS", // jumla oxirini moslash

  SENTENCE_COMPLETION = "SENTENCE_COMPLETION", // jumlani to‘ldirish
  SUMMARY_COMPLETION = "SUMMARY_COMPLETION", // summary to‘ldirish
  NOTE_COMPLETION = "NOTE_COMPLETION", // qaydlarni to‘ldirish
  TABLE_COMPLETION = "TABLE_COMPLETION", // jadvalni to‘ldirish
  FLOWCHART_COMPLETION = "FLOWCHART_COMPLETION", // flowchart to‘ldirish
  DIAGRAM_COMPLETION = "DIAGRAM_COMPLETION", // diagramma to‘ldirish
  SHORT_ANSWER = "SHORT_ANSWER", // qisqa javob berish

  LIST_OF_HEADINGS = "LIST_OF_HEADINGS", // heading ro‘yxatidan tanlash
  CLASSIFICATION = "CLASSIFICATION", // kategoriyaga ajratish
  PICK_FROM_LIST = "PICK_FROM_LIST", // ro‘yxatdan tanlash (drag/drop bo‘lishi ham mumkin)

  TRUE_FALSE_FIXED = "TRUE_FALSE_FIXED", // oldindan variantlari bor TF savollar
  SUMMARY_DRAG_DROP = "SUMMARY_DRAG_DROP", // drag-drop summary
}
