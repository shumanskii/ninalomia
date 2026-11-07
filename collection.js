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
      id: 'collages',
      eyebrow: 'To remember the good days',
      title: 'Moments you shared, in one frame',
      text: 'Choosing the photos is already a conversation. Put together the days you both remember warmly, and let her see that you remember them too.',
      browse: { label: 'Browse photo collages on Etsy', url: 'https://www.etsy.com/search?q=mom%20photo%20collage' }
    },
    {
      id: 'jewelry',
      eyebrow: 'To keep her close',
      title: 'Something to wear close to the heart',
      text: 'A locket holds a photo and a few words. A gentle gift for a mother or a daughter when it is hard to say it out loud.',
      browse: { label: 'Browse photo lockets on Etsy', url: 'https://www.etsy.com/search?q=photo%20locket%20bracelet%20for%20mom' }
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
  var mamaCollage = {
    title: 'Mama Photo Collage: Personalized Gift for Mom',
    text: 'You send your photos, the seller designs the collage and sends a preview within 1\u20132 days, and changes are free. A digital file in 3 sizes that you print at home or at a print shop, so it reaches you anywhere.',
    shop: 'Etsy \u00b7 KnSDesignsPH',
    url: 'https://www.etsy.com/listing/1217312865'
  };
  regions.forEach(function (r) { items[r].collages.push(mamaCollage); });
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
  window.COLLECTION = { categories: categories, items: items };
})();
