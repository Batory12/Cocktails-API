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
-- Insert sample data into Ingredients table
INSERT INTO Ingredients (Name, Type, IsAlcoholic, Image, Description) VALUES
('Vodka', 'Spirit', TRUE, 'vodka.jpg', 'A clear distilled alcoholic beverage.'),
('Gin', 'Spirit', TRUE, 'gin.jpg', 'A distilled alcoholic drink that derives its predominant flavour from juniper berries.'),
('Lemon Juice', 'Juice', FALSE, 'lemon_juice.jpg', 'Juice of lemons.'),
('Sugar Syrup', 'Syrup', FALSE, 'sugar_syrup.jpg', 'A simple syrup made from sugar and water.');

-- Insert sample data into Cocktails table
INSERT INTO Cocktails (Name, Category, Recipe) VALUES
('Vodka Martini', 'Cocktail', 'Mix vodka and dry vermouth, garnish with an olive or a lemon twist.'),
('Gin and Tonic', 'Cocktail', 'Mix gin and tonic water, garnish with a lime wedge.'),
('Lemon Drop', 'Cocktail', 'Mix vodka, lemon juice, and sugar syrup, garnish with a lemon twist.');

-- Insert sample data into Cocktail_Ingredients table
INSERT INTO Cocktail_Ingredients (CocktailID, IngredientID, Quantity) VALUES
(1, 1, '60ml'), -- Vodka Martini with Vodka
(1, 2, '10ml'), -- Vodka Martini with Dry Vermouth (assuming Dry Vermouth is added to Ingredients table)
(2, 2, '50ml'), -- Gin and Tonic with Gin
(2, 3, '100ml'), -- Gin and Tonic with Tonic Water (assuming Tonic Water is added to Ingredients table)
(3, 1, '45ml'), -- Lemon Drop with Vodka
(3, 3, '15ml'), -- Lemon Drop with Lemon Juice
(3, 4, '15ml'); -- Lemon Drop with Sugar Syrup