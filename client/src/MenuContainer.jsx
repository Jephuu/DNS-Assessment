import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.jpeg";
import axios from "axios"; // Added axios import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const MenuContainer = () => {
    const [menus, setMenus] = useState([
        {
            name: "Drinks",
            description: "A wide variety of refreshing drinks.",
            items: [
                { name: "LYCHEETINI", description: "A sweet and tangy cocktail.", price: "$12" },
                { name: "SWEET HEAT", description: "A spicy and sweet drink.", price: "$14" },
                { name: "Moet Spritz", description: "Aperol, St Germain, fresh lime juice.", price: "$20" },
            ],
        },
        {
            name: "Snacks",
            description: "Tasty bites to accompany your drink.",
            items: [
                { name: "Cheese Nachos", description: "Crispy nachos with melted cheese.", price: "$8" },
                { name: "French Fries", description: "Golden, crispy fries.", price: "$5" },
                { name: "Chicken Wings", description: "Spicy and tangy chicken wings.", price: "$10" },
            ],
        },
    ]);

    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    const [newMenu, setNewMenu] = useState({ name: "", description: "" });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", description: "", price: "" });
    const [isItemFormVisible, setIsItemFormVisible] = useState(false);

    const handleAddMenu = () => {
        if (newMenu.name.trim() && newMenu.description.trim()) {
            setMenus([...menus, { ...newMenu, items: [] }]);
            setNewMenu({ name: "", description: "" });
            setIsFormVisible(false);
        } else {
            alert("Please provide both a menu name and description.");
        }
    };

    const handleAddMenu = async () => {
        if (newMenu.name.trim() && newMenu.description.trim()) {
            try {
                // Sending a POST request to the backend to save the new menu
                const response = await axios.post("http://localhost:5000/api/menu", newMenu);
                
                if (response.status === 200) {
                    // If the menu was successfully added to the backend, update the local state
                    setMenus([...menus, { ...newMenu, items: [] }]);
                    setNewMenu({ name: "", description: "" });
                    setIsFormVisible(false);
                } else {
                    alert("Failed to add the menu.");
                }
            } catch (error) {
                console.error("Error adding menu:", error);
                alert("Error adding menu. Please try again later.");
            }
        } else {
            alert("Please provide both a menu name and description.");
        }
    };
    

    const fetchMenus = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/menu");
            setMenus(response.data);
        } catch (error) {
            console.error("Error fetching menus:", error);
        }
    };

    return (
        <div className="container-fluid menu-page">
            {/* Navigation */}
            <div className="navigation-container">
                <div className="navigation-left">
                    <img src={logo} alt="Logo" className="navigation-logo" />
                    <span className="navigation-text">
                        <p className="blue-text">DEEP</p> NET SOFT
                    </span>
                </div>
                <ul className="navigation-ul">
                    <li className="navigation-li"><a href="#">HOME</a></li>
                    <li className="navigation-li"><a href="#" className="active-nav">MENU</a></li>
                    <li className="navigation-li"><a href="#">MAKE A RESERVATION</a></li>
                    <li className="navigation-li"><a href="#">CONTACT US</a></li>
                </ul>
            </div>

            {/* Header */}
            <header className="header-section">
                <h1>MENU</h1>
                <p>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to <br />place an order, use the "Order Online" button located below the menu.</p>
            </header>

            {/* Menu Navigation */}
            <div className="container-fluid menu-navigation">
                <div className="btn-group">
                    {menus.map((menu, index) => (
                        <button
                            key={index}
                            className={`btn ${selectedMenuIndex === index ? "btn-primary" : ""}`}
                            onClick={() => setSelectedMenuIndex(index)}
                        >
                            {menu.name}
                        </button>
                    ))}
                </div>
                <button className="btn addmenubtn" onClick={() => setIsFormVisible(!isFormVisible)}>
                    {isFormVisible ? "Cancel" : "Add New Menu"}
                </button>&emsp;
                <button className="btn addmenubtn" onClick={() => setIsItemFormVisible(!isItemFormVisible)}>
                    {isItemFormVisible ? "Cancel" : "Add New Item"}
                </button>
            </div>

            {/* Menu Form */}
            {isFormVisible && (
                <div className="form-section">
                    <h3>Add a New Menu</h3>
                    <input
                        type="text"
                        placeholder="Menu Name"
                        value={newMenu.name}
                        onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={newMenu.description}
                        onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
                    ></textarea>
                    <button onClick={handleAddMenu}>Add Menu</button>
                </div>
            )}

            {/* Item Form */}
            {isItemFormVisible && (
                <div className="form-section">
                    <h3>Add a New Item</h3>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                    <button onClick={handleAddItem}>Add Item</button>
                </div>
            )}

            {/* Menu Items */}
            <div className="menu-items">
                <div className="inside-menuitems">
                    <h2>{menus[selectedMenuIndex].name}</h2>
                    <p>{menus[selectedMenuIndex].description}</p>
                    <div className="menu-item-list">
                        {menus[selectedMenuIndex].items.map((item, index) => (
                            <div key={index} className="menu-item">
                                <div className="menu-item-details">
                                    <h5>{item.name}</h5>
                                    <p>{item.description}</p>
                                </div>
                                <div className="menu-item-price">
                                    <p>{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    {/* Connect With Us */}
                    <div className="footer-section section1">
                        <h3 className="footer-title">CONNECT WITH US</h3>
                        <p>📞 +91 9567843340</p>
                        <p>📧 info@deepnetsoft.com</p>
                    </div>

                    {/* Logo Section */}
                    <div className="footer-section logo-section section2">
                        <img src={logo} alt="Deep Net Soft Logo" className="footer-logo" />
                        <h2 className="brand-name">
                            DEEP <span className="brand-highlight">NET</span> SOFT
                        </h2>
                        <div className="social-icons">
                            <FontAwesomeIcon icon={faFacebookF} />
                            <FontAwesomeIcon icon={faTwitter} />
                            <FontAwesomeIcon icon={faInstagram} />
                            <FontAwesomeIcon icon={faYoutube} />
                        </div>
                    </div>

                    {/* Find Us */}
                    <div className="footer-section section3">
                        <h3 className="footer-title">FIND US</h3>
                        <p>📍 First floor, Geo Infopark,</p>
                        <p>Infopark EXPY, Kakkanad</p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="p1">© 2024 Deepnetsoft Solutions. All rights reserved.</p>
                    <p className="p2">
                        <a href="/terms">Terms & Conditions</a> | <a href="/privacy">Privacy Policy</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MenuContainer;
