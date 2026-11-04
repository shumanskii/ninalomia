/* Holiday Gift Collection: two categories, items by region.

   CATEGORIES: id, title, text, browse (link "Browse on Etsy" that is always shown;
   later replace its url with your Etsy affiliate link).

   ITEMS: for each region (us, uk, eu, oceania, other) and category id, add 2-4 products:
     { title: 'Product name', text: 'One line on why it is a good gift', shop: 'Etsy', url: 'https://...' }
   While a category has no items, only the "Browse on Etsy" link is shown.

   Regions: us (USA and Canada), uk (United Kingdom and Ireland), eu (Europe),
   oceania (Australia and New Zealand), other (other countries). */
(function () {
  var categories = [
    {
      id: 'journals',
      title: 'Memory Journals for Mom',
      text: 'Guided journals where a mother writes down her stories, her memories, and the things she never had time to say.',
      browse: { label: 'Browse memory journals on Etsy', url: 'https://www.etsy.com/search?q=memory%20journal%20for%20mom' }
    },
    {
      id: 'ornaments',
      title: 'Personalized Christmas Ornaments',
      text: 'Keepsake ornaments with a name, a photo, or even a short family video: small things that come back out of the box every year.',
      browse: { label: 'Browse personalized ornaments on Etsy', url: 'https://www.etsy.com/search?q=personalized%20family%20christmas%20ornament' }
    }
  ];
  var regions = ['us', 'uk', 'eu', 'oceania', 'other'];
  var items = {};
  regions.forEach(function (r) {
    items[r] = {};
    categories.forEach(function (c) { items[r][c.id] = []; });
  });
  /* Gifts shown on the page. Amazon links for the UK, Europe and Australia are ISBN
     searches, so they always open the right book on the local store.
     When your Amazon Associates tag is ready, add ?tag=YOUR-TAG to the Amazon links. */
  var momsStory = {
    title: 'Mom\u2019s Story: A Memory and Keepsake Journal',
    text: 'A linen hardcover with gold foil and lay-flat pages, with gentle prompts about childhood, family, love, and what she has learned.',
    shop: 'Amazon',
    images: ['img/gifts/moms-story-1.jpg', 'img/gifts/moms-story-2.jpg', 'img/gifts/moms-story-3.jpg']
  };
  function withUrl(base, url) { var o = {}; for (var k in base) { o[k] = base[k]; } o.url = url; return o; }
  var mukawa = {
    title: 'Mom, Tell Me Your Story: Guided Memory Journal',
    text: '147 thoughtful prompts and room for photos and handwriting, in a deep green hardcover she will want to keep.',
    shop: 'Amazon',
    url: 'https://www.amazon.com/dp/B0H2YTJPQ5'
  };
  var orb = {
    title: 'Custom Glass Video Globe: Playable Memory Orb',
    text: 'A glass keepsake that plays a short family video. Hang it on the tree or keep it on its stand. Check delivery to your country on the Etsy page.',
    shop: 'Etsy \u00b7 ManicuredCrafts',
    url: 'https://www.etsy.com/listing/4386310182'
  };
  items.us.journals.push(withUrl(momsStory, 'https://www.amazon.com/dp/1950968871'));
  items.uk.journals.push(withUrl(momsStory, 'https://www.amazon.co.uk/s?k=9781950968879'));
  items.eu.journals.push(withUrl(momsStory, 'https://www.amazon.de/s?k=9781950968879'));
  items.oceania.journals.push(withUrl(momsStory, 'https://www.amazon.com.au/s?k=9781950968879'));
  items.other.journals.push(withUrl(momsStory, 'https://www.amazon.com/dp/1950968871'));
  /* Added later: mukawa (US and other) and orb (all regions). */
  window.COLLECTION = { categories: categories, items: items };
})();
