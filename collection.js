/* Holiday gift guide: items by region.
   For each item fill in: title (name), text (one line on why it's a good gift),
   shop (store name), url (affiliate link). While url is empty, the item shows as "SOON".
   Regions: us (USA and Canada), uk (United Kingdom and Ireland), eu (Europe),
   oceania (Australia and New Zealand), other (other countries). */
(function () {
  var slots = [
    ['Planner', 'For notes and small steps toward a conversation.'],
    ['Plush toy', 'A warm gift for a mother or a daughter.'],
    ['Jewelry', 'A gift that says “I’m thinking of you”.'],
    ['Calendar', 'A calendar for the new year with small tasks for two.']
  ];
  var regions = ['us', 'uk', 'eu', 'oceania', 'other'];
  var c = {};
  regions.forEach(function (r) {
    c[r] = slots.map(function (s) {
      return { title: s[0], text: s[1], shop: '', url: '' };
    });
  });
  /* Example:
     c.us[0] = { title: 'Planner name', text: 'Why it fits', shop: 'Amazon', url: 'https://...' };
  */
  window.COLLECTION = c;
})();
