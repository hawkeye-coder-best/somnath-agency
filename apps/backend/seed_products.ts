
const API_URL = 'http://localhost:3001/products';

// Helper function to delete all distinct products first
async function clearProducts() {
    console.log('Clearing existing products...');
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        console.log(`Found ${products.length} products to delete.`);
        for (const product of products) {
            await fetch(`${API_URL}/${product.id}`, { method: 'DELETE' });
        }
        console.log('All existing products deleted.');
    } catch (error) {
        console.error('Error clearing products:', error);
    }
}

const products = [
    // --- FANS (8) ---
    {
        name: "Crompton HighSpeed Aura 48-inch Ceiling Fan (Ivory)",
        brand: "Crompton",
        category: "Fans",
        price: "₹2,100",
        image: "https://www.crompton.co.in/cdn/shop/files/Aura2_Ivory_1100.png?v=1738734676", // Transparent/clean from official site
        description: "High-speed ceiling fan with anti-dust technology. 380 RPM, 100% copper motor for durability. Classic Ivory finish suits all interiors."
    },
    {
        name: "Havells Stealth Air 1250mm Ceiling Fan (Pearl White)",
        brand: "Havells",
        category: "Fans",
        price: "₹6,400",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/s/t/stealth_air_pearl_white_1_2.png", // PNG
        description: "Premium silent fan with aerodynamic blades for noiseless operation. Dust-resistant paint finish and exotic design."
    },
    {
        name: "Orient Electric Apex-FX 1200mm Ceiling Fan (Brown)",
        brand: "Orient",
        category: "Fans",
        price: "₹1,450",
        image: "https://www.orientelectric.com/images/thumbs/0002878_apex-fx-ceiling-fan_550.png", // PNG
        description: "Reliable and high-performance fan with a powerful motor. Ribbed aluminum blades for better air delivery and durability."
    },
    {
        name: "Crompton Energion HS BLDC Ceiling Fan (Opal White)",
        brand: "Crompton",
        category: "Fans",
        price: "₹3,200",
        image: "https://www.crompton.co.in/cdn/shop/files/Energion_HS_Opal_White_1100.png?v=1738734676", // PNG
        description: "Energy-efficient 5-star rated BLDC fan. Saves up to 50% electricity. Comes with a remote control for ease of use."
    },
    {
        name: "Havells Enticer Art 1200mm Ceiling Fan (Floral Brown)",
        brand: "Havells",
        category: "Fans",
        price: "₹3,850",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/e/n/enticer_art_floral_brown_1.png", // PNG
        description: "Artistic floral design to enhance room decor. High air delivery and dust-resistant coating for easy maintenance."
    },
    {
        name: "Orient Electric Aeroslim 1200mm Smart Fan (Marble White)",
        brand: "Orient",
        category: "Fans",
        price: "₹7,800",
        image: "https://www.orientelectric.com/images/thumbs/0002844_aeroslim-smart-ceiling-fan_550.png", // PNG
        description: "IoT-enabled smart fan compatible with Alexa and Google Assistant. Slim cylindrical design with underlight and inverter motor."
    },
    {
        name: "Polycab Zooe Ceiling Fan (Lustre Brown)",
        brand: "Polycab",
        category: "Fans",
        price: "₹1,950",
        image: "https://polycab.com/wp-content/uploads/2022/01/Zooe-Lustre-Brown-Front.png", // PNG potentially
        description: "Polycab Zooe Ceiling Fan. High speed 400 RPM motor for instant cooling. Double ball bearing for smooth operation."
    },
    {
        name: "Polycab Superia SP01 Ceiling Fan (Matt Blue)",
        brand: "Polycab",
        category: "Fans",
        price: "₹2,300",
        image: "https://polycab.com/wp-content/uploads/2021/04/Superia-SP01-Matt-Blue.png", // PNG
        description: "Elegant matte finish with high air thrust. Anti-rust powder coating ensures long life and premium look."
    },

    // --- SWITCHES (10) ---
    {
        name: "Anchor Roma Classic 6A 1-Way Switch (White)",
        brand: "Anchor",
        category: "Switches",
        price: "₹30",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/2/1/21110_romaclassic_1wayswitch_1.png", // Official PNG
        description: "Standard modular switch from India's most trusted brand. Smooth operation and long life. Polycarbonate material."
    },
    {
        name: "Legrand Myrius 6A 1-Way Switch (White)",
        brand: "Legrand",
        category: "Switches",
        price: "₹55",
        image: "https://www.legrand.co.in/uploads/tx_legrandproduct/673000.png", // PNG
        description: "Sleek and artistic design. Finger-proof terminals for safety. AgNi contacts for durability and spark-free operation."
    },
    {
        name: "Schneider Zencelo 10A 1-Way Switch (Silver Bronze)",
        brand: "Schneider",
        category: "Switches",
        price: "₹180",
        image: "https://download.schneider-electric.com/files?p_Doc_Ref=E8431_1_SZ_3&p_File_Type=rendition_369_jpg", // Clean product image
        description: "Revolutionary full-flat switch design. Patented mechanism for 'in-stand' position. Premium finish for modern homes."
    },
    {
        name: "Havells Fabio 6A 1-Way Switch (White)",
        brand: "Havells",
        category: "Switches",
        price: "₹45",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/a/h/ahksxxw061_1.png", // PNG
        description: "Soft switching mechanism and elegant design. Flame retardant polycarbonate ensuring high safety standards."
    },
    {
        name: "Anchor Penta Modular 6A Switch",
        brand: "Anchor",
        category: "Switches",
        price: "₹25",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/6/5/65001_penta_1wayswitch_1_1.png", // PNG
        description: "Affordable and durable modular switch. Ideal for residential and commercial use. Glossy finish."
    },
    {
        name: "Legrand Lyncus 6A Bell Push Switch (Chic Grey)",
        brand: "Legrand",
        category: "Switches",
        price: "₹120",
        image: "https://www.legrand.co.in/uploads/tx_legrandproduct/675512.png", // PNG
        description: "Stylish doorbell switch in Chic Grey. Smooth action and compatible with Lyncus plates."
    },
    {
        name: "Schneider Livia 6A 2-Way Switch (White)",
        brand: "Schneider",
        category: "Switches",
        price: "₹95",
        image: "https://download.schneider-electric.com/files?p_Doc_Ref=W8001_2_WH_3&p_File_Type=rendition_369_jpg", // Clean
        description: "Curved design specifically for Indian homes. 2-way functionality for staircase or bedside control."
    },
    {
        name: "Anchor Roma Urban 16A Switch (Black)",
        brand: "Anchor",
        category: "Switches",
        price: "₹110",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/2/3/23011_romaurban_1wayswitch_black_1.png", // PNG
        description: "Heavy-duty 16A switch for ACs and geysers. Premium black matte finish from the Roma Urban collection."
    },
    {
        name: "Legrand Arteor 6A 1-Way Switch (Magnesium)",
        brand: "Legrand",
        category: "Switches",
        price: "₹150",
        image: "https://www.legrand.co.in/uploads/tx_legrandproduct/572007.png", // PNG
        description: "Global design language with a unique magnesium finish. Perfect for luxury interiors and high-end offices."
    },
    {
        name: "Havells Crabtree Verona 10A Switch (White)",
        brand: "Havells",
        category: "Switches",
        price: "₹75",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/a/c/acwsxxw101_1.png", // PNG
        description: "Premium Crabtree range by Havells. Dust-free glossy finish and robust internal mechanism."
    },

    // --- LED BULBS (10) ---
    {
        name: "Philips 9W cool Day Light LED Bulb (Pack of 2)",
        brand: "Philips",
        category: "Lighting",
        price: "₹199",
        image: "https://www.lighting.philips.co.in/b-dam/b2c/en_IN/products/led-bulbs/929001160311-led-bulb.png", // PNG
        description: "Best-selling 9W LED bulb. EyeComfort technology reducing glare. 6500K Cool Day Light, B22 base."
    },
    {
        name: "Crompton 9W Anti-Bac LED Bulb",
        brand: "Crompton",
        category: "Lighting",
        price: "₹120",
        image: "https://www.crompton.co.in/cdn/shop/files/Antibac_Bulb_600x600.png?v=1738734676", // Clean PNG
        description: "Innovative LED bulb that kills up to 85% germs. Safe for humans, provides bright cool daylight."
    },
    {
        name: "Havells 12W LED Bulb (Warm White)",
        brand: "Havells",
        category: "Lighting",
        price: "₹250",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/l/h/lhwwbyu5iu12_1.png", // PNG
        description: "12W power for extra brightness. Warm white (3000K) for a cozy atmosphere in living rooms."
    },
    {
        name: "Philips 14W Stellar Bright LED Bulb",
        brand: "Philips",
        category: "Lighting",
        price: "₹350",
        image: "https://www.assets.lighting.philips.com/is/image/PhilipsLighting/929002251011-RMS-global-001?wid=400&hei=400&$pnglarge$", // PNG
        description: "High brightness 14W bulb equivalent to 100W incandescent. Ideal for large rooms and kitchens."
    },
    {
        name: "Orient Electric 9W Inverter LED Bulb",
        brand: "Orient",
        category: "Lighting",
        price: "₹450",
        image: "https://www.orientelectric.com/images/thumbs/0004944_emergency-led-lamp_550.png", // PNG
        description: "Emergency bulb with 4-hour battery backup. Automatically turns on during power cuts."
    },
    {
        name: "Crompton 7W LED Bulb (Cool Day Light)",
        brand: "Crompton",
        category: "Lighting",
        price: "₹85",
        image: "https://www.crompton.co.in/cdn/shop/files/LSD_7W_CDL_600x600.png?v=1738734676", // PNG
        description: "Energy-efficient 7W bulb for small rooms and bathrooms. High voltage protection up to 4kV."
    },
    {
        name: "Havells Nu Bulb 9W (Multipack of 4)",
        brand: "Havells",
        category: "Lighting",
        price: "₹399",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/l/h/lhwwbyc5iu9w_pack_of_4_1.png", // PNG
        description: "Value pack of 4. High lumen output and long life. Eco-friendly with no mercury."
    },
    {
        name: "Philips T-Bulb 10W (Cool Day Light)",
        brand: "Philips",
        category: "Lighting",
        price: "₹299",
        image: "https://www.assets.lighting.philips.com/is/image/PhilipsLighting/929001955311-RMS-global-001?wid=400&hei=400&$pnglarge$", // PNG
        description: "Unique T-shaped bulb for wider light spread. Fits in existing B22 holder. Plug and play."
    },
    {
        name: "Orient Electric 40W High Wattage LED Bulb",
        brand: "Orient",
        category: "Lighting",
        price: "₹850",
        image: "https://www.orientelectric.com/images/thumbs/0004907_high-wattage-led-lamp_550.png", // PNG
        description: "High wattage hammer-head design bulb. Replaces CFLs in shops and warehouses. 4000 lumens output."
    },
    {
        name: "Anchor 9W LED Bulb Smart WiFi",
        brand: "Anchor",
        category: "Lighting",
        price: "₹699",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/p/b/pbhm0965_1.jpg", // Couldn't find transparent easily, clean jpg
        description: "Smart WiFi enabled bulb. Control color and brightness via Panasonic Smart app. 16 million colors."
    },

    // --- LED TUBELIGHTS (10) ---
    {
        name: "Philips Twinglow 20W LED Batten (Up-Down)",
        brand: "Philips",
        category: "Lighting",
        price: "₹999",
        image: "https://www.assets.lighting.philips.com/is/image/PhilipsLighting/919215850682-RMS-global-001?wid=400&hei=400&$pnglarge$", // PNG
        description: "Dual mode batten: Uplight for ambiance, Downlight for task. Change modes with existing switch."
    },
    {
        name: "Crompton Laser Ray Neo 20W LED Batten",
        brand: "Crompton",
        category: "Lighting",
        price: "₹250",
        image: "https://www.crompton.co.in/cdn/shop/files/Laser_Ray_Neo_20W_600x600.png?v=1738734676", // PNG
        description: "Slim and aesthetic design. Uniform light output with no dark spots. Surge protection enabled."
    },
    {
        name: "Havells Tubelight 20W Cool Day Light",
        brand: "Havells",
        category: "Lighting",
        price: "₹280",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/l/h/lheaepn5inz020_1.png", // PNG
        description: "High lumen efficacy. Glare-free light perfect for study rooms and offices. Durable polycarbonate body."
    },
    {
        name: "Orient Electric 20W LED Batten (Pack of 2)",
        brand: "Orient",
        category: "Lighting",
        price: "₹550",
        image: "https://www.orientelectric.com/images/thumbs/0004928_led-batten_550.png", // PNG
        description: "Value pack. Easy to install with provided clips. Energy saving replacement for old 36W tubelights."
    },
    {
        name: "Philips 20W Smart Wi-Fi LED Batten",
        brand: "Philips",
        category: "Lighting",
        price: "₹1,299",
        image: "https://www.assets.lighting.philips.com/is/image/PhilipsLighting/929002226201-RMS-global-001?wid=400&hei=400&$pnglarge$", // PNG
        description: "Smart batten controlled via WiZ app. Tunable white (Warm to Cool) and dimmable."
    },
    {
        name: "Crompton Star Lord 20W Round LED Panel",
        brand: "Crompton",
        category: "Lighting",
        price: "₹350",
        image: "https://www.crompton.co.in/cdn/shop/files/Star_Lord_Round_20W_600x600.png?v=1738734676", // PNG
        description: "Technically a panel, but often used as ceiling light. Ultra-slim rim for modern ceilings."
    },
    {
        name: "Havells Adore 20W LED Batten (Warm White)",
        brand: "Havells",
        category: "Lighting",
        price: "₹320",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/l/h/lheaepu3iwz020_1.png", // PNG
        description: "Warm white light (3000K) for relaxing environments. Integrated driver for voltage fluctuation protection."
    },
    {
        name: "Anchor by Panasonic 20W LED Batten",
        brand: "Anchor",
        category: "Lighting",
        price: "₹230",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/p/b/pbhm2065_1.jpg", // Clean
        description: "Quality lighting from Panasonic. Linear design with high diffusion cover for soft lighting."
    },
    {
        name: "Philips 36W Powerful LED Batten",
        brand: "Philips",
        category: "Lighting",
        price: "₹750",
        image: "https://www.assets.lighting.philips.com/is/image/PhilipsLighting/919215850682-RMS-global-001?wid=400&hei=400&$pnglarge$", // PNG (Placeholder similar model)
        description: "High brightness 36W option for larger halls and commercial spaces. 4-foot length."
    },
    {
        name: "Polycab 20W LED Batten Luminaire",
        brand: "Polycab",
        category: "Lighting",
        price: "₹260",
        image: "https://polycab.com/wp-content/uploads/2021/04/T5-Batten-1.png", // PNG
        description: "Efficient heat dissipation design. Environment friendly and recyclable material."
    },

    // --- HOLDERS (10) ---
    {
        name: "Anchor Batten Holder (Polycarbonate)",
        brand: "Anchor",
        category: "Accessories",
        price: "₹45",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/5/0/50346_battenholder_1.png", // PNG
        description: "Standard angle holder for wall mounting. Heat resistant polycarbonate body with brass terminals."
    },
    {
        name: "Cona Fancy Angle Holder",
        brand: "Anchor",
        category: "Accessories",
        price: "₹55",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/3/9/39678_angleholder_1.png", // PNG
        description: "Anchor Penta Fancy Angle Holder. Aesthetic design for modern homes. skirted rim."
    },
    {
        name: "Anchor Pendant Holder (White)",
        brand: "Anchor",
        category: "Accessories",
        price: "₹35",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/5/1/51357_pendantholder_1.png", // PNG
        description: "Hanging holder for bulbs. Secure grip and durable threads. Ideal for temporary or festive lighting."
    },
    {
        name: "Havells Reo Angle Holder",
        brand: "Havells",
        category: "Accessories",
        price: "₹60",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/a/h/ahkrxqwo00_1.png", // PNG
        description: "Premium angle holder from Havells Reo range. Glossy white finish and robust build."
    },
    {
        name: "Anchor Jumbo Batten Holder",
        brand: "Anchor",
        category: "Accessories",
        price: "₹75",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/3/9/39678_battenholder_1.png", // PNG
        description: "Heavy duty holder with larger skirt. Suitable for high wattage lamps."
    },
    {
        name: "Legrand Mylinc Batten Holder",
        brand: "Legrand",
        category: "Accessories",
        price: "₹95",
        image: "https://www.legrand.co.in/uploads/tx_legrandproduct/675544.png", // PNG
        description: "Minimalist design batten holder. High quality PBT material for heat resistance."
    },
    {
        name: "Orient Electric Angle Holder",
        brand: "Orient",
        category: "Accessories",
        price: "₹50",
        image: "https://www.orientelectric.com/images/thumbs/0002167_angle-holder_550.png", // PNG
        description: "Durable angle holder with heavy brass parts. Compatible with all B22 bulbs."
    },
    {
        name: "Havells Coral Batten Holder",
        brand: "Havells",
        category: "Accessories",
        price: "₹65",
        image: "https://havells.com/media/catalog/product/cache/241fb75c20d771ba0d8295b95ba887c3/a/h/ahkcxqwb00_1.png", // PNG
        description: "Coral series holder. Elegant curvature and safe electrical contacts. Easy wiring."
    },
    {
        name: "Anchor Multi-Holder Adapter",
        brand: "Anchor",
        category: "Accessories",
        price: "₹120",
        image: "https://lsin.panasonic.com/media/catalog/product/cache/8d157a32af259024f96409418e24c449/9/0/9018_2pinmultiholder_1.png", // PNG
        description: "Adapter to plug two bulbs in one socket. useful for extra brightness from single point."
    },
    {
        name: "Finolex Batten Holder",
        brand: "Finolex",
        category: "Accessories",
        price: "₹55",
        image: "https://finolex.com/wp-content/uploads/2021/07/Batten-Holder.png", // PNG
        description: "Reliable batten holder from Finolex. Flame retardant material ensuring home safety."
    }
];

async function seedProducts() {
    await clearProducts();

    console.log(`Starting seed of ${products.length} products...`);
    let successCount = 0;
    let failCount = 0;

    for (const product of products) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                console.log(`[SUCCESS] Added: ${product.name}`);
                successCount++;
            } else {
                console.error(`[FAILED] ${product.name}: ${response.status} ${response.statusText}`);
                const text = await response.text();
                console.error('Response:', text);
                failCount++;
            }
        } catch (error) {
            console.error(`[ERROR] ${product.name}:`, error.message);
            failCount++;
        }
    }

    console.log('\n--- Seeding Complete ---');
    console.log(`Total Success: ${successCount}`);
    console.log(`Total Failed: ${failCount}`);
}

seedProducts();
