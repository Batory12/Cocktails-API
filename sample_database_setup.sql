-- Create the database
CREATE DATABASE cocktailsDB;

-- Use the database
USE cocktailsDB;

-- Create the tables
CREATE TABLE Ingredients (
    IngredientID INT AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(50),
    IsAlcoholic BOOLEAN DEFAULT FALSE,
    Image VARCHAR(255),
    Description TEXT,
    PRIMARY KEY (IngredientID)
);

CREATE TABLE Cocktails (
    CocktailID INT AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Category TEXT,
    Recipe TEXT,
    PRIMARY KEY (CocktailID),
);

CREATE TABLE Cocktail_Ingredients (
    CocktailID INT,
    IngredientID INT,
    Quantity VARCHAR(50),
    PRIMARY KEY (CocktailID, IngredientID),
    FOREIGN KEY (CocktailID) REFERENCES Cocktails(CocktailID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID)
);

-- Insert sample data into Ingredients
INSERT INTO Ingredients (Name, Type, IsAlcoholic, Image, Description) VALUES 
('Vodka', 'Spirit', TRUE, 'vodka.jpg', 'A clear distilled alcoholic beverage.'),
('Gin', 'Spirit', TRUE, 'gin.jpg', 'A distilled alcoholic drink that derives its predominant flavour from juniper berries.'),
('Lemon Juice', 'Juice', FALSE, 'lemon_juice.jpg', 'Juice of lemons.'),
('Sugar Syrup', 'Syrup', FALSE, 'sugar_syrup.jpg', 'A simple syrup made from sugar and water.');

-- Insert sample data into Cocktails
INSERT INTO Cocktails (Name, Category_ID, Recipe) VALUES 
('Vodka Martini', 1, 'Mix vodka and dry vermouth. Shake with ice and strain into a chilled cocktail glass.'),
('Gin and Tonic', 1, 'Pour gin and tonic water into a glass filled with ice. Stir gently.'),
('Lemonade', 3, 'Mix lemon juice, sugar syrup, and water. Serve over ice.');

-- Insert sample data into CocktailIngredients
INSERT INTO CocktailIngredients (CocktailID, IngredientID, Quantity) VALUES 
(1, 1, '60 ml'), -- Vodka Martini with Vodka
(1, 3, '10 ml'), -- Vodka Martini with Lemon Juice
(2, 2, '50 ml'), -- Gin and Tonic with Gin
(2, 3, '100 ml'), -- Gin and Tonic with Lemon Juice
(3, 3, '30 ml'), -- Lemonade with Lemon Juice
(3, 4, '20 ml'); -- Lemonade with Sugar Syrup