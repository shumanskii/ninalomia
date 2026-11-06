/* Holiday Gift Collection: two categories, items by region.

   CATEGORIES: id, title, text, browse (link "Browse on Etsy" that is always shown;
   later replace its url with your Etsy affiliate link).

   ITEMS: for each region (us, uk, eu, other) and category id, add 2-4 products:
     { title: 'Product name', text: 'One line on why it is a good gift', shop: 'Etsy', url: 'https://...' }
   While a category has no items, only the "Browse on Etsy" link is shown.

   Regions: us (USA and Canada), uk (United Kingdom and Ireland), eu (Europe),
   other (all other countries, including Australia and New Zealand). */
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
  var regions = ['us', 'uk', 'eu', 'other'];
  var items = {};
  regions.forEach(function (r) {
    items[r] = {};
    categories.forEach(function (c) { items[r][c.id] = []; });
  });
  /* Gifts shown on the page. Amazon links for the UK and Europe are ISBN
     searches, so they always open the right book on the local store.
     When your Amazon Associates tag is ready, add ?tag=YOUR-TAG to the Amazon links. */
  var momsStory = {
    title: 'Mom\u2019s Story: A Memory and Keepsake Journal',
    text: 'Over 90 gentle prompts, from early childhood to words of wisdom, so Mom can tell her story in her own handwriting. Linen hardcover with gold foil, lay-flat pages, and room for photos.',
    shop: 'Amazon',
    images: ['img/moms-story-1.jpg', 'img/moms-story-2.jpg', 'img/moms-story-3.jpg']
  };
  function withUrl(base, url) { var o = {}; for (var k in base) { o[k] = base[k]; } o.url = url; return o; }
  var mukawa = {
    title: 'Mom, Tell Me Your Story: Guided Memory Journal',
    text: '147 guided questions about childhood, family, love, and what she has learned, with room for her handwriting and her photos.',
    shop: 'Amazon',
    url: 'https://www.amazon.com/dp/B0H2YTJPQ5?tag=ninalomia-20'
  };
  var orb = {
    title: 'Custom Glass Video Globe: Playable Memory Orb',
    text: 'A glass keepsake that plays a short family video. Hang it on the tree or keep it on its stand. Check delivery to your country on the Etsy page.',
    shop: 'Etsy \u00b7 ManicuredCrafts',
    url: 'https://www.etsy.com/listing/4386310182'
  };
  items.us.journals.push(withUrl(momsStory, 'https://www.amazon.com/dp/1950968871?tag=ninalomia-20'));
  items.uk.journals.push(withUrl(momsStory, 'https://www.amazon.co.uk/dp/1950968871?tag=ninalomia02-21'));
  items.eu.journals.push(withUrl(momsStory, 'https://www.amazon.de/dp/1950968871?tag=ninalomia-21'));
  items.other.journals.push(withUrl(momsStory, 'https://www.amazon.com/dp/1950968871?tag=ninalomia-20'));
  var hearYourStory = {
    title: 'Mom, I Want to Hear Your Story',
    text: 'Over 250 gentle questions that lead Mom from her childhood to the turning points of her life, in an easy fill-in layout.',
    shop: 'Amazon',
    images: ['img/hear-your-story-1.jpg', 'img/hear-your-story-2.jpg', 'img/hear-your-story-3.jpg', 'img/hear-your-story-4.jpg', 'img/hear-your-story-5.jpg']
  };
  var hearYourStoryUk = {
    title: 'Mum, I Want to Hear Your Story',
    text: hearYourStory.text,
    shop: 'Amazon',
    images: hearYourStory.images
  };
  items.us.journals.push(withUrl(hearYourStory, 'https://www.amazon.com/dp/146425141X?tag=ninalomia-20'));
  items.uk.journals.push(withUrl(hearYourStoryUk, 'https://www.amazon.co.uk/dp/1464251258?tag=ninalomia02-21'));
  items.eu.journals.push(withUrl(hearYourStoryUk, 'https://www.amazon.de/dp/1464251258?tag=ninalomia-21'));
  items.other.journals.push(withUrl(hearYourStory, 'https://www.amazon.com/dp/146425141X?tag=ninalomia-20'));
  var leather = {
    title: 'Mom, Tell Me Your Story: A Guided Memory Journal',
    text: 'Over 275 guided prompts in a beige hardcover with a magnetic closure, made for Mom to write her life story by hand.',
    shop: 'Amazon',
    images: ['img/mom-tell-me-1.jpg', 'img/mom-tell-me-2.jpg', 'img/mom-tell-me-3.jpg', 'img/mom-tell-me-4.jpg']
  };
  items.us.journals.push(withUrl(leather, 'https://www.amazon.com/dp/B0FT9XV51R?tag=ninalomia-20'));
  items.uk.journals.push(withUrl(leather, 'https://www.amazon.co.uk/dp/B0FT9XV51R?tag=ninalomia02-21'));
  items.other.journals.push(withUrl(leather, 'https://www.amazon.com/dp/B0FT9XV51R?tag=ninalomia-20'));
  /* Europe: the same book on amazon.de costs about 2.4x more and has only 20 reviews (checked Nov 5, 2026), so not shown there.
     Not used for now: mukawa (US only, unavailable on amazon.de and amazon.co.uk) and orb. */
  window.COLLECTION = { categories: categories, items: items };
})();
