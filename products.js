/**
 * Product data - mirrors Shopify Storefront API product object shape.
 * When connecting to Shopify headless, replace this file with API fetch calls.
 *
 * Fields map to Shopify's Product, ProductVariant, and Image objects:
 *   id          -> product.id
 *   title       -> product.title
 *   handle/slug -> product.handle
 *   description -> product.descriptionHtml
 *   vendor      -> product.vendor
 *   productType -> product.productType
 *   tags        -> product.tags
 *   images      -> product.images.edges (first = featuredImage)
 *   variants    -> product.variants.edges
 *   metafields  -> product.metafields
 */
const PRODUCTS = [
  {
    id: "prod-001",
    title: "18th Century French Serpentine Commode with Mirror",
    slug: "french-serpentine-commode-mirror",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["commode", "french", "18th century", "serpentine", "mirror"],
    images: [
      { src: "images/01-french-commode-mirror.jpg", alt: "French serpentine commode with mirror, styled with flowers and lamp" },
      { src: "images/03-french-commode-eucalyptus.jpg", alt: "Similar commode styled with eucalyptus and wooden boards" }
    ],
    descriptionHtml: "<p>A beautifully proportioned 18th century French serpentine commode in naturally aged oak. The three-drawer chest features characteristic carved rosette handles and elegant cabriole feet. Shown here styled with a period mirror, ceramic vase and table lamp.</p><p>This piece has wonderful patina throughout and is in excellent structural condition for its age. A versatile piece that works equally well in a hallway, bedroom or living room.</p>",
    variants: [
      {
        id: "var-001-default",
        title: "Default",
        price: 720000,
        compareAtPrice: null,
        sku: "CT-FC-001",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 120cm | Depth: 55cm | Height: 85cm",
      period: "18th Century",
      origin: "France",
      material: "Oak",
      condition: "Good antique condition with natural age-related wear and beautiful patina."
    }
  },
  {
    id: "prod-002",
    title: "Empire Period Chest with Marble Top as Vanity",
    slug: "empire-chest-marble-vanity",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["empire", "chest", "marble", "vanity", "19th century"],
    images: [
      { src: "images/02-empire-chest-marble-vanity.jpg", alt: "Empire period chest converted to bathroom vanity with marble top" }
    ],
    descriptionHtml: "<p>A striking Empire period chest of drawers with ebonised columns, ornate brass mounts and a Belgian black marble top. Beautifully repurposed as a bathroom vanity unit with brass fittings.</p><p>Flanked by elegant brass wall sconces and set against painted tongue-and-groove panelling. A statement piece that brings gravitas and character to any bathroom.</p>",
    variants: [
      {
        id: "var-002-default",
        title: "Default",
        price: 485000,
        compareAtPrice: null,
        sku: "CT-EC-002",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 110cm | Depth: 50cm | Height: 90cm",
      period: "Empire Period, early 19th Century",
      origin: "France",
      material: "Walnut with ebonised detailing, Belgian black marble top",
      condition: "Excellent. Professionally adapted for use as a vanity. Marble in superb condition."
    }
  },
  {
    id: "prod-003",
    title: "18th Century French Provincial Commode",
    slug: "french-provincial-commode",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["commode", "french", "provincial", "18th century"],
    images: [
      { src: "images/03-french-commode-eucalyptus.jpg", alt: "French provincial commode with eucalyptus arrangement and wooden boards" }
    ],
    descriptionHtml: "<p>A characterful 18th century French provincial commode with three deep drawers, carved diamond-pattern escutcheons and shaped apron. Retaining its original brass drop handles.</p><p>Displayed here in a country kitchen setting with a collection of antique bread boards and a large stoneware vessel of eucalyptus. A wonderful rustic piece with superb aged patina.</p>",
    variants: [
      {
        id: "var-003-default",
        title: "Default",
        price: 390000,
        compareAtPrice: null,
        sku: "CT-FC-003",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 125cm | Depth: 58cm | Height: 88cm",
      period: "18th Century",
      origin: "France",
      material: "Oak",
      condition: "Good antique condition. Natural wear consistent with age. Structurally sound."
    }
  },
  {
    id: "prod-004",
    title: "Large Oak Refectory Table with Bulbous Legs",
    slug: "oak-refectory-table-bulbous-legs",
    vendor: "Chapter Two",
    productType: "Tables",
    tags: ["table", "refectory", "oak", "kitchen", "country house"],
    images: [
      { src: "images/04-oak-refectory-table.jpg", alt: "Large oak refectory table in country kitchen with bulbous carved legs" },
      { src: "images/12-oak-kitchen-table.jpg", alt: "Similar oak table in a bright kitchen setting" }
    ],
    descriptionHtml: "<p>A substantial oak refectory table with magnificent turned bulbous legs and a shaped trestle stretcher base. The thick plank top has a wonderful, naturally bleached surface from years of kitchen use.</p><p>This is a seriously impressive table that seats eight comfortably. Perfect as a kitchen table, dining table or as a large country house work surface.</p>",
    variants: [
      {
        id: "var-004-default",
        title: "Default",
        price: 380000,
        compareAtPrice: null,
        sku: "CT-RT-004",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Length: 200cm | Width: 90cm | Height: 78cm",
      period: "19th Century",
      origin: "England",
      material: "Oak",
      condition: "Excellent. Top has been sympathetically cleaned. Structurally very strong."
    }
  },
  {
    id: "prod-005",
    title: "19th Century Marble Top Hallway Table with Chair",
    slug: "marble-top-hallway-table",
    vendor: "Chapter Two",
    productType: "Tables",
    tags: ["table", "hallway", "marble", "19th century", "chair"],
    images: [
      { src: "images/05-hallway-table-chair.jpg", alt: "Marble top hallway table with upholstered chair beside a sweeping staircase" }
    ],
    descriptionHtml: "<p>An elegant 19th century oval hallway table with a white marble top, turned and fluted legs, and a delicate finial stretcher base. Accompanied by a Louis XV style upholstered side chair in olive velvet.</p><p>Shown here in a grand entrance hall with a sweeping mahogany staircase and chequered marble floor. The table is equally at home in a drawing room or bedroom.</p>",
    variants: [
      {
        id: "var-005-table",
        title: "Table Only",
        price: 265000,
        compareAtPrice: null,
        sku: "CT-HT-005",
        available: true,
        options: [{ name: "Configuration", value: "Table Only" }]
      },
      {
        id: "var-005-set",
        title: "Table & Chair",
        price: 345000,
        compareAtPrice: null,
        sku: "CT-HT-005-SET",
        available: true,
        options: [{ name: "Configuration", value: "Table & Chair" }]
      }
    ],
    metafields: {
      dimensions: "Table: Width 95cm | Depth 60cm | Height 75cm",
      period: "19th Century",
      origin: "France",
      material: "Walnut with white marble top. Chair in beech with velvet upholstery.",
      condition: "Very good. Minor age-related marks to marble. Chair recently reupholstered."
    }
  },
  {
    id: "prod-006",
    title: "Victorian Pine Chest of Drawers with Brass Handles",
    slug: "victorian-pine-chest-drawers",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["chest", "pine", "victorian", "drawers", "brass"],
    images: [
      { src: "images/06-pine-chest-of-drawers.jpg", alt: "Victorian pine chest of drawers with ornate brass handles" }
    ],
    descriptionHtml: "<p>A solid Victorian pine chest of three drawers with wonderful Art Nouveau brass handles and escutcheons. Retaining its original waxed finish with a rich, honey-coloured patina.</p><p>A very usable, honest piece of country house furniture in excellent structural condition. Works beautifully in a bedroom, hallway or living room.</p>",
    variants: [
      {
        id: "var-006-default",
        title: "Default",
        price: 145000,
        compareAtPrice: null,
        sku: "CT-PC-006",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 92cm | Depth: 48cm | Height: 82cm",
      period: "Victorian, circa 1890",
      origin: "England",
      material: "Pine with brass hardware",
      condition: "Good. Original finish with natural wear. All drawers run smoothly."
    }
  },
  {
    id: "prod-007",
    title: "Large Ornate Carved Floor Standing Mirror",
    slug: "ornate-carved-floor-mirror",
    vendor: "Chapter Two",
    productType: "Mirrors",
    tags: ["mirror", "floor standing", "carved", "ornate", "large"],
    images: [
      { src: "images/07-ornate-floor-mirror.jpg", alt: "Large ornate carved floor standing mirror leaning against wall" }
    ],
    descriptionHtml: "<p>A magnificent large floor standing mirror with an elaborately carved and moulded frame featuring acanthus leaf scrollwork, swag detailing and classical cartouche cresting.</p><p>The frame has a rich, dark patina with traces of original gilding and a beautiful tortoiseshell-effect panel border. The original plate glass has gentle foxing which adds to its character. A truly statement piece.</p>",
    variants: [
      {
        id: "var-007-default",
        title: "Default",
        price: 320000,
        compareAtPrice: null,
        sku: "CT-FM-007",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 120cm | Height: 185cm | Depth: 12cm",
      period: "19th Century",
      origin: "Continental Europe",
      material: "Carved wood with original plate glass",
      condition: "Good. Some minor losses to carving consistent with age. Original glass with attractive foxing."
    }
  },
  {
    id: "prod-008",
    title: "17th Century Carved Oak Coffer with Geometric Panels",
    slug: "carved-oak-coffer-geometric",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["coffer", "oak", "carved", "17th century", "geometric"],
    images: [
      { src: "images/08-carved-oak-coffer.jpg", alt: "17th century carved oak coffer with geometric panels, lamp and mirror" }
    ],
    descriptionHtml: "<p>A superb 17th century carved oak coffer or mule chest with bold geometric panelled front, retaining its original ironwork clasp. The top lifts to reveal generous storage.</p><p>Styled here as a hallway console with a gilded overmantel mirror, ceramic table lamp, disco ball and dried hydrangeas. Sitting on a beautiful antique kilim runner. A versatile and architecturally striking piece.</p>",
    variants: [
      {
        id: "var-008-default",
        title: "Default",
        price: 280000,
        compareAtPrice: null,
        sku: "CT-OC-008",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 140cm | Depth: 55cm | Height: 65cm",
      period: "17th Century",
      origin: "England",
      material: "Oak with original ironwork",
      condition: "Excellent for its age. Rich dark patina. Lid and hinges in full working order."
    }
  },
  {
    id: "prod-009",
    title: "19th Century Carved Indian Hall Bench",
    slug: "carved-indian-hall-bench",
    vendor: "Chapter Two",
    productType: "Seating",
    tags: ["bench", "indian", "carved", "hall", "19th century"],
    images: [
      { src: "images/09-carved-hall-bench.jpg", alt: "Carved Indian hall bench with cushions on chequered marble floor" }
    ],
    descriptionHtml: "<p>A handsome 19th century carved Indian hall bench with an elaborately fretted back panel, scrolled arms and turned front legs. Shown here with linen seat cushions and tapestry bolster cushions.</p><p>Set against lime-washed plaster walls on a chequered marble floor, this is a wonderfully characterful piece for an entrance hall, conservatory or covered garden room.</p>",
    variants: [
      {
        id: "var-009-default",
        title: "Default",
        price: 195000,
        compareAtPrice: null,
        sku: "CT-HB-009",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 180cm | Depth: 60cm | Height: 95cm | Seat Height: 45cm",
      period: "19th Century",
      origin: "India",
      material: "Carved hardwood",
      condition: "Good. Some old repairs consistent with age and use. Structurally sound. Cushions included."
    }
  },
  {
    id: "prod-010",
    title: "French Louis XV Style Cane Panelled Bed",
    slug: "french-louis-xv-cane-bed",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["bed", "french", "louis xv", "cane", "bergere"],
    images: [
      { src: "images/10-french-cane-bed.jpg", alt: "French Louis XV style cane panelled bed with linen bedding" }
    ],
    descriptionHtml: "<p>A beautiful French Louis XV style double bed with cane-panelled head and footboards, carved floral cresting and graceful serpentine rails. The warm, honey-toned frame has a naturally aged finish.</p><p>Dressed here with washed linen bedding in a serene, minimal bedroom with herringbone parquet floors and a potted olive tree. Fits a standard UK double mattress.</p>",
    variants: [
      {
        id: "var-010-default",
        title: "Default",
        price: 350000,
        compareAtPrice: null,
        sku: "CT-CB-010",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Internal: 140cm x 190cm | Overall Width: 155cm | Headboard Height: 120cm",
      period: "Early 20th Century",
      origin: "France",
      material: "Beech frame with cane panels",
      condition: "Very good. Cane intact throughout. Frame is solid and ready to use."
    }
  },
  {
    id: "prod-011",
    title: "Carved Wooden Folding Screen",
    slug: "carved-folding-screen",
    vendor: "Chapter Two",
    productType: "Decorative",
    tags: ["screen", "folding", "carved", "wooden", "moorish"],
    images: [
      { src: "images/11-folding-screen-bath.jpg", alt: "Carved wooden folding screen behind a clawfoot bath" }
    ],
    descriptionHtml: "<p>A stunning four-panel carved wooden folding screen with intricate Moorish-style fretwork upper panels and solid lower panels. Each panel is topped with ornamental finials.</p><p>Shown here as a dramatic backdrop to a freestanding clawfoot bath with brass fittings, in a dark-panelled bathroom. Equally effective as a room divider, behind a dressing table, or as a decorative wall feature.</p>",
    variants: [
      {
        id: "var-011-default",
        title: "Default",
        price: 425000,
        compareAtPrice: null,
        sku: "CT-FS-011",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Each panel: Width 50cm | Height: 180cm | Total span: approx 200cm",
      period: "19th Century",
      origin: "India or Middle East",
      material: "Carved hardwood",
      condition: "Good. Some minor losses to fretwork. Hinges in working order. Folds flat for transport."
    }
  },
  {
    id: "prod-012",
    title: "Large Country House Oak Kitchen Table",
    slug: "country-house-oak-kitchen-table",
    vendor: "Chapter Two",
    productType: "Tables",
    tags: ["table", "kitchen", "oak", "country house", "refectory"],
    images: [
      { src: "images/12-oak-kitchen-table.jpg", alt: "Large oak kitchen table in bright country kitchen" },
      { src: "images/04-oak-refectory-table.jpg", alt: "Oak refectory table in a darker kitchen setting" }
    ],
    descriptionHtml: "<p>A large and inviting country house oak kitchen table with turned baluster legs and a trestle stretcher base. The thick scrubbed top has a beautiful, pale, sun-bleached finish.</p><p>Photographed in a traditional country kitchen with open shelving, copper pans and farmhouse chairs. A table made for gathering around -- seats six to eight people comfortably.</p>",
    variants: [
      {
        id: "var-012-default",
        title: "Default",
        price: 295000,
        compareAtPrice: null,
        sku: "CT-KT-012",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Length: 180cm | Width: 85cm | Height: 76cm",
      period: "19th Century",
      origin: "England",
      material: "Oak",
      condition: "Very good. Top has been cleaned and waxed. Legs and stretcher are solid."
    }
  },
  {
    id: "prod-013",
    title: "Arts and Crafts Carved Oak Coal Cabinet",
    slug: "arts-crafts-coal-cabinet",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["cabinet", "arts and crafts", "oak", "carved", "fireside"],
    images: [
      { src: "images/13-carved-coal-cabinet.jpg", alt: "Arts and crafts carved oak coal cabinet beside fireplace" },
      { src: "images/16-victorian-coal-purdonium.jpg", alt: "Similar coal purdonium in open position showing interior" }
    ],
    descriptionHtml: "<p>A charming Arts and Crafts period carved oak coal cabinet or purdonium with an elaborately carved front panel depicting scrolling foliage. The top features a shaped gallery with incised quatrefoil decoration.</p><p>Shown beside a stone fireplace with a log basket on oak floorboards. A beautiful and practical fireside piece that can also serve as a side table or small cupboard.</p>",
    variants: [
      {
        id: "var-013-default",
        title: "Default",
        price: 85000,
        compareAtPrice: null,
        sku: "CT-CC-013",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 38cm | Depth: 38cm | Height: 72cm",
      period: "Arts and Crafts, circa 1890-1910",
      origin: "England",
      material: "Oak with brass fittings",
      condition: "Good. Original brass clasp and side handles. Interior lined. Some wear to top edge."
    }
  },
  {
    id: "prod-014",
    title: "Antique Bevelled Edge Wall Mirror with Chain",
    slug: "bevelled-edge-wall-mirror",
    vendor: "Chapter Two",
    productType: "Mirrors",
    tags: ["mirror", "wall", "bevelled", "antique", "frameless"],
    images: [
      { src: "images/14-antique-wall-mirror.jpg", alt: "Antique bevelled edge wall mirror hanging on textured plaster wall" }
    ],
    descriptionHtml: "<p>A lovely antique frameless wall mirror with a shaped top edge, bevelled glass and an original hanging chain. The glass has a beautiful, clouded antiqued quality with gentle foxing around the edges.</p><p>Hung here on a lime-plastered wall, reflecting a characterful cottage interior with beamed ceiling, stone fireplace and antique furniture. A wonderful mirror with genuine age and charm.</p>",
    variants: [
      {
        id: "var-014-default",
        title: "Default",
        price: 64000,
        compareAtPrice: null,
        sku: "CT-WM-014",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 65cm | Height: 45cm",
      period: "Early 20th Century",
      origin: "England",
      material: "Bevelled plate glass with original chain",
      condition: "Good. Characterful foxing and clouding to glass. No chips or cracks."
    }
  },
  {
    id: "prod-015",
    title: "Edwardian Oak Marble Top Washstand",
    slug: "edwardian-oak-marble-washstand",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["washstand", "oak", "marble", "edwardian", "bathroom"],
    images: [
      { src: "images/15-oak-marble-washstand.jpg", alt: "Edwardian oak washstand with black marble top in tiled bathroom" }
    ],
    descriptionHtml: "<p>An Edwardian oak washstand with a black Belgian marble top and splashback, single cupboard door and tapering square legs on castors. A handsome and practical piece.</p><p>Photographed in a period bathroom with hexagonal floor tiles and a clawfoot bath visible beyond. Works perfectly as a bathroom vanity, bedside table or small console in a hallway.</p>",
    variants: [
      {
        id: "var-015-default",
        title: "Default",
        price: 175000,
        compareAtPrice: null,
        sku: "CT-WS-015",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 76cm | Depth: 46cm | Height: 95cm (including splashback)",
      period: "Edwardian, circa 1900-1910",
      origin: "England",
      material: "Oak with Belgian black marble",
      condition: "Very good. Marble has minor surface marks. Oak is solid with a rich colour. Original castors."
    }
  },
  {
    id: "prod-016",
    title: "Victorian Carved Oak Coal Purdonium",
    slug: "victorian-carved-coal-purdonium",
    vendor: "Chapter Two",
    productType: "Furniture",
    tags: ["purdonium", "coal", "victorian", "oak", "carved", "fireside"],
    images: [
      { src: "images/16-victorian-coal-purdonium.jpg", alt: "Victorian carved oak coal purdonium open beside fireplace" },
      { src: "images/13-carved-coal-cabinet.jpg", alt: "Similar coal cabinet in closed position" }
    ],
    descriptionHtml: "<p>A fine Victorian carved oak coal purdonium with a tilt-front door revealing a metal-lined coal store. The front panel is carved with an elaborate scrolling foliate design, and the top has a raised gallery shelf -- perfect for a vase or candle.</p><p>Shown here open beside a carved stone fireplace surround with a log basket and patterned rug. A charming and functional fireside companion that doubles as a decorative side table.</p>",
    variants: [
      {
        id: "var-016-default",
        title: "Default",
        price: 95000,
        compareAtPrice: null,
        sku: "CT-CP-016",
        available: true,
        options: []
      }
    ],
    metafields: {
      dimensions: "Width: 36cm | Depth: 36cm | Height: 68cm",
      period: "Victorian, circa 1880",
      origin: "England",
      material: "Oak with metal-lined interior, brass clasp and handles",
      condition: "Good. Original metal liner intact. Brass fittings present. Some wear to carved edges."
    }
  }
];
