import peachCobbler from "./assets/peach-cobbler.jpg";
import lemonPound from "./assets/Lemon-Pound-Cakejpeg.jpeg";
import sweetPotato from "./assets/sweet-potato-pie.jpg";
import cheesecake from "./assets/strawberry-cheesecake.jpg";
import german from "./assets/german.jpg";
import matilda from "./assets/Matildas-Chocolate-Cake.jpg";
import wedding from "./assets/wedding.jpg";

const bakeryItems = [
    {
        id: 1,
        category: "Cakes",
        name: "German Chocolate Cake",
        image: german,
        price: 35,
        description:
            "Chocolate cake layered with coconut pecan frosting and rich chocolate flavor.",
        details:
            "A rich and indulgent chocolate cake made with soft, moist layers and filled with our homemade coconut pecan frosting. Each layer is packed with toasted coconut and pecans, creating the perfect combination of chocolate, caramel-like sweetness, and nutty flavor. Finished with a smooth chocolate frosting, this classic cake is perfect for birthdays, celebrations, or simply treating yourself to something special."
    },
    {
        id: 2,
        category: "Cakes",
        name: "Matilda Fudge Chocolate Cake",
        image: matilda,
        price: 35,
        description:
            "Decadent multi-layer chocolate fudge cake inspired by the famous Matilda cake.",
        details:
            "For serious chocolate lovers! Our Matilda Cake features layers of incredibly moist chocolate cake covered in rich, silky chocolate fudge frosting. Inspired by the unforgettable chocolate cake from Matilda, every slice is thick, decadent, and packed with chocolate flavor. It's the perfect centerpiece for birthdays, celebrations, or any occasion that calls for an extra-special chocolate dessert."
    },
    {
        id: 3,
        category: "Cakes",
        name: "Wedding Cakes",
        image: wedding,
        price: 500,
        description:
            "Beautiful custom wedding cakes designed to match your special day.",
        details:
            "Make your special day even sweeter with a beautiful custom wedding cake created especially for you. Each wedding cake is made to order and can be customized to complement your wedding colors, theme, and personal style. Choose from a variety of cake flavors, fillings, frostings, sizes, and decorative details. Pricing begins at $500 and varies depending on the size, design, flavors, and level of customization."
    },
    {
        id: 4,
        category: "Cakes",
        name: "Lemon Pound Cake",
        image: lemonPound,
        price: 35,
        description:
            "Rich and moist lemon pound cake with a fresh lemon glaze.",
        details:
            "A buttery, moist pound cake bursting with bright lemon flavor. Made with fresh citrus flavor and baked until beautifully golden, this cake has a soft, rich crumb and just the right balance of sweetness and tartness. A sweet lemon glaze is poured over the top for an extra burst of citrus in every bite. Perfect with coffee, tea, or as a refreshing dessert after a meal."
    },
    {
        id: 5,
        category: "Pies",
        name: "Peach Cobbler",
        image: peachCobbler,
        price: 35,
        description:
            "Homemade peach cobbler made with juicy peaches and a buttery golden crust.",
        details:
            "A comforting homemade classic filled with sweet, juicy peaches and warm spices beneath a buttery, golden topping. Baked until the peaches are tender and bubbling and the crust is beautifully golden, our peach cobbler has that warm, homemade flavor that's perfect for family gatherings, holidays, or Sunday dinner. Serve it warm on its own or add a scoop of vanilla ice cream for an extra-special treat."
    },
    {
        id: 6,
        category: "Pies",
        name: "Sweet Potato Pie",
        image: sweetPotato,
        price: 35,
        description:
            "A Southern favorite made with creamy sweet potatoes and warm spices.",
        details:
            "A classic Southern-style sweet potato pie with a smooth, creamy filling and a perfectly baked crust. The sweet potato filling is blended with warm spices and just the right amount of sweetness to create a rich, comforting dessert. It's especially perfect for Thanksgiving and holiday gatherings, but it's delicious enough to enjoy any time of year."
    },
    {
        id: 7,
        category: "Cheesecakes",
        name: "Strawberry Cheesecake",
        image: cheesecake,
        price: 35,
        description:
            "Smooth cheesecake topped with fresh strawberries and a sweet strawberry glaze.",
        details:
            "A rich and creamy cheesecake with a smooth, velvety filling and a delicious crust, finished with strawberries and a sweet strawberry topping. The creamy cheesecake and bright strawberry flavor create the perfect balance of rich and refreshing. It's a beautiful dessert for birthdays, anniversaries, celebrations, or whenever you're craving something sweet."
    }
];

export default bakeryItems;