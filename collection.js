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
      eyebrow: 'To understand her',
      title: 'Her story, in her own words',
      text: 'Many of us never learned who our mother was before she became \u201cMom\u201d. A memory journal gives her a gentle way to tell her story, and gives you a reason to sit down and really listen.',
      browse: { label: 'Browse memory journals on Etsy', url: 'https://www.etsy.com/search?q=memory%20journal%20for%20mom' }
    },
    {
      id: 'ornaments',
      eyebrow: 'To start a new tradition',
      title: 'A shared memory on the tree',
      text: 'A photo of a warm moment, hung where you both will see it every Christmas. A quiet way to say: we have good days too, and I want more of them.',
      browse: { label: 'Browse photo ornaments on Etsy', url: 'https://www.etsy.com/search?q=family%20photo%20christmas%20ornament' }
    },
    {
      id: 'jewelry',
      eyebrow: 'To keep her close',
      title: 'Something to wear close to the heart',
      text: 'A locket holds a photo and a few words. A gentle gift for a mother or a daughter when it is hard to say it out loud.',
      browse: { label: 'Browse photo lockets on Etsy', url: 'https://www.etsy.com/search?q=photo%20locket%20bracelet%20for%20mom' }
    },
    {
      id: 'keychains',
      eyebrow: 'To carry it with you',
      title: 'A little album for her keys or bag',
      text: 'A pocket-sized keepsake with the photos of the days you both remember warmly. Something she can carry everywhere, and open when she misses you.',
      browse: { label: 'Browse photo keychains on Etsy', url: 'https://www.etsy.com/search?q=photo%20album%20keychain%20for%20mom' }
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
  var photoBall = {
    title: 'Custom Round Christmas Ball Ornament with Your Photo',
    text: 'A ceramic ball with a favorite photo on the front, plus optional text. Upload the photo when you order and choose a tree or bells design for the back.',
    shop: 'Etsy \u00b7 WhiskerwishesUSA',
    images: ['img/ball-1.jpg'],
    url: 'https://www.etsy.com/listing/1803363186'
  };
  var clearBall = {
    title: 'Custom Photo Christmas Ball, Clear 8 cm (3.15 in)',
    text: 'A photo of a warm moment, cropped into a circle inside a clear ornament, with an optional LED light. Send the photo when you order. Ships from Germany, so no customs fees within Europe.',
    shop: 'Etsy \u00b7 FirstBellStudio',
    images: ['img/ball-2.jpg'],
    url: 'https://www.etsy.com/listing/4604068356'
  };
  /* Europe and UK first: ships from Germany. Everywhere else the ceramic ball (ships from the US) goes first. */
  items.eu.ornaments.push(clearBall, photoBall);
  items.uk.ornaments.push(clearBall, photoBall);
  items.us.ornaments.push(photoBall, clearBall);
  items.other.ornaments.push(photoBall, clearBall);
  /* Photo collages: hidden for now. To bring it back, add a category with id 'collages' and re-add the card below.
  var mamaCollage = {
    title: 'Mama Photo Collage: Personalized Gift for Mom',
    text: 'You send your photos, the seller designs the collage and sends a preview within 1\u20132 days, and changes are free. A digital file in 3 sizes that you print at home or at a print shop, so it reaches you anywhere.',
    shop: 'Etsy \u00b7 KnSDesignsPH',
    url: 'https://www.etsy.com/listing/1217312865'
  };
  regions.forEach(function (r) { items[r].collages.push(mamaCollage); });
  */
  var locket = {
    title: 'Custom Heart Locket Bracelet with Photo',
    text: 'A heart locket on an adjustable chain that holds a photo of the two of you and opens like a tiny book. Made to order in the UK, so order early for Christmas. Orders to the EU and US may be subject to customs fees.',
    shop: 'Etsy \u00b7 Sellbyhope',
    images: ['img/jewelry-1.jpg'],
    url: 'https://www.etsy.com/listing/4559357105'
  };
  regions.forEach(function (r) { items[r].jewelry.push(locket); });
  var ring = {
    title: 'Personalized Photo Locket Ring',
    text: 'A small heart locket ring that opens to a hidden photo and a short message. Made to order in the UK, so order early for Christmas. Orders to the EU may be subject to customs fees.',
    shop: 'Etsy \u00b7 Sellbyhope',
    images: ['img/jewelry-2.jpg'],
    url: 'https://www.etsy.com/listing/4586305001'
  };
  regions.forEach(function (r) { items[r].jewelry.push(ring); }); /* country list checked Nov 6, 2026: ships worldwide; free to the US */
  /* Photo keychains (checked Nov 7, 2026). Europe and UK: only sellers that ship from Europe.
     US, Canada and other countries: only the two US sellers (Tolentinoshop, SugarMoon).
     Photos: keychain-1 = 30SecondsToCraft, keychain-2 = MAXIGIFTstore, keychain-3 = Tolentinoshop, keychain-4 = SugarMoon. */
  var kcMom = {
    title: 'Leather Photo Keychain for Mom',
    text: 'A leather keychain with a photo inside, made as a gift from a son or daughter to Mom. Handmade in Poland. Check delivery to your country on the Etsy page.',
    shop: 'Etsy \u00b7 30SecondsToCraft',
    images: ['img/keychain-1.jpg'],
    url: 'https://www.etsy.com/listing/876202138'
  };
  var kcMaxi = {
    title: 'Mini Photo Album Keychain',
    text: 'A tiny leather photo album on a keyring, with your own photos inside. Ships from Poland to most of Europe and the UK, so no customs fees within Europe.',
    shop: 'Etsy \u00b7 MAXIGIFTstore',
    images: ['img/keychain-2.jpg'],
    url: 'https://www.etsy.com/listing/1636205920'
  };
  var kcTolentino = {
    title: 'Leather Mini Photo Album Keychain',
    text: 'A pocket-sized leather photo album on a keyring, with your printed photos inside. Ships from the US.',
    shop: 'Etsy \u00b7 TolentinoshopStore',
    images: ['img/keychain-3.jpg'],
    url: 'https://www.etsy.com/listing/1858032161'
  };
  var kcSugar = {
    title: 'Leather Keychain with Photo Tag',
    text: 'A leather keychain with a metal photo tag and a short engraved message. You choose the words, so it can say \u201cMom\u201d. A bestseller with hundreds of reviews. Ships from the US.',
    shop: 'Etsy \u00b7 SugarMoonCreationsCo',
    images: ['img/keychain-4.jpg'],
    url: 'https://www.etsy.com/listing/1848276365'
  };
  items.eu.keychains.push(kcMom, kcMaxi);
  items.uk.keychains.push(kcMom, kcMaxi);
  items.us.keychains.push(kcTolentino, kcSugar);
  items.other.keychains.push(kcTolentino, kcSugar);
  window.COLLECTION = { categories: categories, items: items };
})();
