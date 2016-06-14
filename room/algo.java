import java.applet.Applet;
import java.awt.Checkbox;
import java.awt.CheckboxGroup;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Label;
import java.awt.MediaTracker;
import java.awt.Panel;
import java.awt.TextArea;
import java.awt.TextComponent;
import java.awt.TextField;
import java.awt.Toolkit;
import java.io.PrintStream;
import java.net.MalformedURLException;
import java.net.URL;

public class fairDivision
  extends Applet
{
  Image image;
  Graphics graphics;
  Simplex divvy;
  HybridSlate inputPanel;
  Panel outputPanel;
  ImageSlate displayPanel;
  ControlSlate controlPanel;
  ControlSlate configPanel;
  ControlSlate rentPanel;
  TextArea history;
  TextField choice;
  Control reStart;
  Control aboutText;
  Control clearText;
  Control thanksText;
  Control enterData;
  Control suggest;
  Color color = new Color(153, 156, 212);
  Color dcolor = new Color(69, 71, 128);
  Color lcolor = new Color(255, 255, 219);
  Color tanColor = new Color(255, 235, 148);
  Color backgroundColor = this.color;
  String thanksApplet = new String(
  
    "\n\n        ----- ACKNOWLEDGEMENTS -----\n   Thanks to: F. Simmons, M. Starbird, D. Mazzoni,\n   M. Raith, C.J. Haake, HMC Research Grants 1998-2000,\n   and MOST OF ALL, Elisha Peterson and Patrick Vinograd.\n   This applet would not have been possible without\n   Elisha's initial craftsmanship and Patrick's technical\n   wizardry and dedication to this project over the\n   last couple of years.\n              -------Francis Edward Su,  April 2000\n");
  String aboutApplet = new String(
  
    "\n\n   ----- THE FAIR DIVISION CALCULATOR v.3.02 -----\n  Project Director: Francis Edward Su\n  Applet Coding and Design:\n       Patrick Vinograd (v.2.0-3.0), Elisha Peterson (v.1.0)\n  Sperner Algorithms: Forest Simmons and Francis Su\n  HRS: Claus-Jochen Haake, Matthias Raith, and F.E. Su\n       Comments, feedback welcome:  su@math.hmc.edu\n       May not be reproduced without permission.\n   ------- (c) 1998-2000 by Francis Edward Su -------\n");
  Label command;
  Label credit;
  Label howMany;
  FontMetrics textFontM;
  Font textFont;
  int width;
  int height;
  boolean working;
  boolean proposing;
  boolean graduated;
  int players;
  String divType;
  Image picture;
  Image title;
  MediaTracker tracker;
  boolean gettingRent;
  int totalRent;
  boolean needBids;
  double[][] bids;
  double[][] hrsBids;
  double[] compensations;
  int[] assignments;
  int[] backAssignments;
  double[] payment;
  boolean[] envious;
  double[][] aveDisBids;
  boolean[] inD;
  int magD;
  double[][] discounts;
  double[] averages;
  double[] rNode;
  double[] pNode;
  int[] rPointer;
  int[] pPointer;
  double finalNode;
  int finalPointer;
  int inCycle;
  int whoBidding;
  char alpha = 'A';
  TextField bidField;
  Control bidB;
  QuerySlate bidPanel;
  boolean algType;
  String rentType;
  double surplus;
  Checkbox howSurplus;
  boolean aveDisMethod;
  Checkbox cb1;
  Checkbox cb2;
  Checkbox cb3;
  boolean exAnte;
  boolean bidsTooSmall;
  hrsUtil hrsDivision;
  
  public void init()
  {
    setLayout(null);
    makeImageBuffer();
    setBackground(this.lcolor);
    this.width = Integer.parseInt(getParameter("width"));
    this.height = Integer.parseInt(getParameter("height"));
    
    this.textFont = new Font("Helvetica", 0, 11);
    this.working = false;
    addPanels();
    getConfig();
    
    makeAuction();
    howRent();
    
    setup();
    
    this.choice.requestFocus();
    repaint();
  }
  
  public void setup()
  {
    this.players = -1;
    this.totalRent = -1;
    this.divType = null;
    this.displayPanel.image = null;
    this.displayPanel.visible = false;
    this.configPanel.visible = true;
    
    this.choice.setText("");
    this.history.appendText("\n\n       =======* STARTING NEW DIVISION *=======\n");
    
    this.history.appendText("Please enter the number of players, press 'Enter',\n");
    this.history.appendText("and press a button for a division type.\n");
    this.history.appendText("Then follow the instructions in this window.\n\n");
    this.suggest.title = "Suggest Division";
    this.suggest.disable();
    
    this.bidsTooSmall = false;
    this.proposing = false;
    this.working = false;
    this.gettingRent = false;
    this.algType = false;
    this.needBids = false;
    this.rentPanel.visible = false;
    this.bidPanel.visible = false;
    repaint();
  }
  
  public void addPanels()
  {
    this.inputPanel = new HybridSlate(0, 0, 150, 150);
    this.inputPanel.visible = true;
    this.displayPanel = new ImageSlate(150, 0, 300, 150, 50, 25, 200, 100);
    this.outputPanel = new Panel();
    
    this.outputPanel.reshape(0, 150, 350, 200);
    this.outputPanel.setBackground(Color.white);
    
    this.outputPanel.setFont(this.textFont);
    this.outputPanel.setLayout(null);
    add(this.outputPanel);
    
    this.controlPanel = new ControlSlate(350, 150, 100, 200);
    this.controlPanel.visible = true;
    addElements();
  }
  
  public void addElements()
  {
    this.reStart = new Control("Restart", 0, 0, 100, 50);
    
    this.clearText = new Control("Clear", 0, 50, 100, 50);
    this.aboutText = new Control("About", 0, 100, 100, 50);
    this.thanksText = new Control("Thanks", 0, 150, 100, 50);
    this.controlPanel.add(this.aboutText);
    this.controlPanel.add(this.reStart);
    this.controlPanel.add(this.clearText);
    
    this.controlPanel.add(this.thanksText);
    this.textFontM = this.outputPanel.getFontMetrics(this.outputPanel.getFont());
    this.history = new TextArea();
    this.outputPanel.add(this.history);
    
    this.history.reshape(0, 0, 350, 200);
    this.history.setEditable(false);
    this.choice = new TextField(10);
    this.choice.reshape(0, 90, 75, 30);
    add(this.choice);
    
    this.enterData = new Control("Enter", 75, 90, 75, 30);
    this.inputPanel.add(this.enterData);
    this.suggest = new Control("Suggest Division", 0, 120, 150, 30);
    this.inputPanel.add(this.suggest);
    this.suggest.disable();
    try
    {
      URL localURL = new URL(getDocumentBase(), "title.gif");
      Toolkit localToolkit = Toolkit.getDefaultToolkit();
      this.title = localToolkit.getImage(localURL);
    }
    catch (MalformedURLException localMalformedURLException) {}
    try
    {
      this.tracker.addImage(this.title, 0);
      this.tracker.waitForAll();
    }
    catch (Exception localException) {}
    this.inputPanel.title = this.title;
  }
  
  public void getConfig()
  {
    this.configPanel = new ControlSlate(150, 0, 300, 150);
    this.displayPanel.visible = false;
    this.configPanel.visible = true;
    Control localControl1 = new Control("Cake", 0, 0, 100, 150);
    Control localControl2 = new Control("Chores", 100, 0, 100, 150);
    Control localControl3 = new Control("Rent", 200, 0, 100, 150);
    localControl2.invert();
    localControl1.invert();
    localControl3.invert();
    localControl1.altText = "Goods";
    localControl2.altText = "Burdens";
    localControl1.ALTFLAG = true;
    localControl2.ALTFLAG = true;
    this.configPanel.add(localControl2);
    this.configPanel.add(localControl1);
    this.configPanel.add(localControl3);
  }
  
  public void makeAuction()
  {
    this.bidPanel = new QuerySlate(150, 0, 300, 150);
    this.bidField = new TextField(260);
    this.bidField.reshape(175, 35, 200, 30);
    add(this.bidField);
    this.bidB = new Control("Bid", 225, 35, 50, 30);
    this.bidPanel.add(this.bidB);
    this.bidPanel.text_y = 30;
    CheckboxGroup localCheckboxGroup = new CheckboxGroup();
    
    this.cb1 = new Checkbox("with equal distribution of surplus", 
      localCheckboxGroup, false);
    this.cb2 = new Checkbox("with average discount method", 
      localCheckboxGroup, true);
    this.cb3 = new Checkbox("with ex-post equal payments & cycling", 
      localCheckboxGroup, false);
    
    this.graphics.setColor(this.dcolor);
    
    this.cb1.reshape(160, 70, 260, 25);
    this.cb2.reshape(160, 95, 260, 25);
    this.cb3.reshape(160, 120, 260, 25);
    add(this.cb1);
    add(this.cb2);
    add(this.cb3);
  }
  
  public void howRent()
  {
    this.rentPanel = new ControlSlate(300, 0, 150, 150);
    Control localControl1 = new Control("Interactive", 0, 0, 150, 50);
    Control localControl2 = new Control("Auto-Choose", 0, 50, 150, 50);
    Control localControl3 = new Control("HRS", 0, 100, 150, 50);
    localControl1.invert();
    localControl2.invert();
    localControl3.invert();
    
    this.rentPanel.add(localControl1);
    this.rentPanel.add(localControl2);
    this.rentPanel.add(localControl3);
    localControl1.secondLine = "Sperner";
    localControl1.SECFLAG = true;
    localControl2.secondLine = "Sperner";
    localControl2.SECFLAG = true;
  }
  
  public boolean mouseUp(Event paramEvent, int paramInt1, int paramInt2)
  {
    this.choice.requestFocus();
    String str;
    int j;
    if (this.inputPanel.contains(paramInt1, paramInt2))
    {
      str = this.inputPanel.which(paramInt1, paramInt2);
      if ((str == "Suggest Division") && (this.working))
      {
        this.proposing = true;
        this.suggest.title = "Continue Iteration";
        suggestDivision();
        repaint();
        return true;
      }
      if (str == "Continue Iteration")
      {
        this.proposing = false;
        this.suggest.title = "Suggest Division";
        this.choice.setText("");
        this.history.appendText("--- CONTINUING ITERATION ---\n\n");
        tellCuts();
        repaint();
        return true;
      }
      if (str == "Enter")
      {
        if (this.gettingRent)
        {
          try
          {
            this.totalRent = Integer.parseInt(this.choice.getText());
          }
          catch (NumberFormatException localNumberFormatException1)
          {
            this.choice.setText("");
            this.history.appendText("Please enter a positive number of dollars.\n");
            this.totalRent = -1;
            return true;
          }
          if (this.totalRent < 0)
          {
            this.choice.setText("");
            this.history.appendText("Please enter a positive rent.\n");
            this.totalRent = -1;
            return true;
          }
          this.history.appendText("   Total rent: $" + this.totalRent + ".\n");
          this.gettingRent = false;
          
          this.choice.setText("");
          this.algType = true;
          
          this.bids = new double[this.players][];
          this.configPanel.visible = false;
          this.rentPanel.visible = true;
          makeSimplex();
          this.history.appendText(
          
            "Please select one of the algorithms at top right.\n   * Interactive Sperner --- iterative, useful for arbitrary\n      player preferences.\n   * Auto-Choose Sperner --- accepts bids, useful if\n      you can assume linear utility in money.\n   * HRS --- bidding/compensation procedure that mimics\n      natural mediation process (computer not needed).\n");
          
          repaint();
          return true;
        }
        if (this.players == -1)
        {
          try
          {
            this.players = Integer.parseInt(this.choice.getText());
          }
          catch (NumberFormatException localNumberFormatException2)
          {
            this.choice.setText("");
            this.history.appendText("Between 2 and 26 players please.\n");
            return false;
          }
          if ((this.players < 2) || (this.players > 26))
          {
            this.choice.setText("");
            this.history.appendText("Between 2 and 26 players please.\n");
            this.players = -1;
            return false;
          }
          this.choice.setText("");
          this.history.appendText("   " + this.players + " players selected.\n");
          areYouReady();
          return true;
        }
        if ((this.working) && (!this.proposing))
        {
          j = 0;
          try
          {
            j = Integer.parseInt(this.choice.getText());
          }
          catch (NumberFormatException localNumberFormatException3)
          {
            this.history.appendText(" Not a valid choice.\n");
            this.choice.setText("");
            return true;
          }
          if ((j < 1) || (j > this.players))
          {
            this.history.appendText(" Not a valid choice.\n");
            this.choice.setText("");
            return true;
          }
          if ((this.divType == "Cake") && (this.divvy.points[this.divvy.newPoint].getTransform(j - 1, this.divType) == 0.0D))
          {
            this.history.appendText(" Not a valid choice.\n");
            this.choice.setText("");
            return true;
          }
          this.divvy.points[this.divvy.newPoint].label = j;
          this.history.appendText(" [" + this.divvy.points[this.divvy.newPoint].label + "] was chosen.\n\n");
          this.divvy.findPivot();
          this.graduated = this.divvy.bigAl();
          if (this.divType == "Chores") {
            while (this.divvy.autoChoose()) {
              this.graduated = this.divvy.bigAl();
            }
          }
          if (this.graduated) {
            this.suggest.enable();
          } else {
            this.suggest.disable();
          }
          tellCuts();
          this.choice.setText("");
          repaint();
          return true;
        }
      }
    }
    if (this.controlPanel.contains(paramInt1, paramInt2))
    {
      str = this.controlPanel.which(paramInt1, paramInt2);
      if (str == "About")
      {
        this.history.appendText(this.aboutApplet);
        return true;
      }
      if (str == "Clear")
      {
        this.history.setText("");
        return true;
      }
      if (str == "Restart")
      {
        setup();
        return true;
      }
      if (str == "Thanks")
      {
        this.history.appendText(this.thanksApplet);
        return true;
      }
    }
    if (this.configPanel.contains(paramInt1, paramInt2))
    {
      str = this.configPanel.which(paramInt1, paramInt2);
      if (str != "")
      {
        this.divType = str;
        if (this.divType == "Cake") {
          this.history.appendText(
          
            "   Division of goods (e.g., cake) selected.\nPlease place the goods along a linear scale from 0 to 100.\n   Suggested divisions below will use parallel knives\n   along this scale. (The graphic above is just an example.)\nPressing the 'Suggest Division' button when it turns\n   red gives a solution good to displayed precision.\n");
        } else if (this.divType == "Chores") {
          this.history.appendText(
          
            "Division of burdens (e.g., chores) selected.\nPlease place burdens along a linear scale from 0 to 100.\n   Suggested divisions below will use parallel knives\n   along this scale. (The graphic above is just an example.)\nPressing the 'Suggest Division' button when it turns\n   red gives a solution good to displayed precision.\n");
        } else {
          this.history.appendText("   Rent division selected.\n");
        }
        if (this.players == -1) {
          this.history.appendText("\nPlease enter number of players and press 'Enter'.\n");
        }
        this.configPanel.visible = false;
        areYouReady();
        repaint();
        return true;
      }
    }
    if (this.rentPanel.contains(paramInt1, paramInt2))
    {
      str = this.rentPanel.which(paramInt1, paramInt2);
      this.rentType = str;
      if (str == "Interactive")
      {
        this.history.appendText(
        
          "\n-----------------\nProceeding with Interactive Sperner Algorithm.\nCalculator will suggest possible rents; please\nchoose the room you most prefer at those prices.\n(Negative rents mean being paid to take a room.)\n   Pressing the 'Suggest Division' button when it turns\nred gives a solution good to displayed precision.\n\n");
        
        this.algType = false;
        this.working = true;
        
        this.displayPanel.visible = true;
        initSimplex();
        startDivision();
        
        return true;
      }
      if (str == "Auto-Choose")
      {
        this.history.appendText(
        
          "\n-----------------\nProceeding with Auto-Choose Sperner Algorithm.\nThis option allows players to make bids on rooms, and\nruns the Sperner algorithm for an envy-free outcome\nbased on the surplus [bid]-[cost].  (Doing this assumes\nthat your utility for money is linear---to avoid this\nassumption, use the Interactive Sperner option.)\n     Please enter bids, separated by commas,\nin order of the room numbers in the window above.\n");
        
        this.suggest.disable();
        this.needBids = true;
        this.rentPanel.visible = false;
        this.bidPanel.visible = true;
        startBids();
        return true;
      }
      if (str == "HRS")
      {
        this.history.appendText(
        
          "\n-----------------\nProceeding with the HRS algorithm.\nPlayers make bids on rooms, and envy-free outcome is\nobtained by a series of compensations.  Envy is\nbased the excess [bid]-[cost] (assumes quasi-linear\nutilities).  Choose a sub-option for dealing with\nthe surplus after envy is eliminated.\n     Then please enter bids, separated by commas,\n(in order of room numbers) in the top right window.\n");
        
        this.suggest.disable();
        this.needBids = true;
        this.rentPanel.visible = false;
        this.bidPanel.visible = true;
        startBids();
        return true;
      }
    }
    if (this.bidPanel.contains(paramInt1, paramInt2))
    {
      str = this.bidPanel.which(paramInt1, paramInt2);
      if (str == "Bid")
      {
        if (parseString(this.bidField.getText()))
        {
          this.whoBidding += 1;
          if (this.whoBidding == this.players)
          {
            if (this.cb1.getState())
            {
              this.exAnte = true;
              this.aveDisMethod = false;
            }
            else if (this.cb2.getState())
            {
              if ((this.bidsTooSmall) && (this.rentType == "HRS"))
              {
                this.exAnte = true;
                this.aveDisMethod = false;
                this.history.appendText("     Bids did not sum to total rent for all players.\n");
                this.history.appendText("***  Using equal distribution of surplus instead. ***\n");
              }
              else
              {
                this.exAnte = true;
                this.aveDisMethod = true;
              }
            }
            else
            {
              this.exAnte = false;
              this.aveDisMethod = false;
            }
            this.history.appendText("     Successfully got all bids:\n\n");
            for (j = 0; j < this.players; j++)
            {
              this.history.appendText("     " + this.bids[j][0]);
              for (int k = 1; k < this.players; k++) {
                this.history.appendText(", " + this.bids[j][k]);
              }
              this.history.appendText("\n");
            }
            this.bidsTooSmall = false;
            this.bidPanel.visible = false;
            this.displayPanel.visible = true;
            this.rentPanel.visible = true;
            repaint();
            this.needBids = false;
            
            initSimplex();
            startDivision();
            return true;
          }
          askBids();
          repaint();
          return true;
        }
        askAgain();
        return true;
      }
      return true;
    }
    if ((this.displayPanel.contains(paramInt1, paramInt2)) && (this.working) && (!this.proposing) && (this.divType != "Rent"))
    {
      int i = this.displayPanel.getChoice(this.divvy.points[this.divvy.newPoint], 200, paramInt1, this.divType);
      if (i != 0)
      {
        this.divvy.points[this.divvy.newPoint].label = i;
        this.history.appendText(" [" + this.divvy.points[this.divvy.newPoint].label + "] was chosen.\n\n");
        this.divvy.findPivot();
        this.graduated = this.divvy.bigAl();
        if (this.divType == "Chores") {
          while (this.divvy.autoChoose()) {
            this.graduated = this.divvy.bigAl();
          }
        }
        if (this.graduated) {
          this.suggest.enable();
        } else {
          this.suggest.disable();
        }
        tellCuts();
        repaint();
        return true;
      }
      this.history.append(" Not a valid choice.\n");
    }
    return false;
  }
  
  public double printRound(double paramDouble)
  {
    return Math.round(100.0D * paramDouble) / 100.0D;
  }
  
  public double carryRound(double paramDouble)
  {
    return Math.round(10000.0D * paramDouble) / 10000.0D;
  }
  
  public void suggestDivision()
  {
    howsThis();
  }
  
  public void tellCuts()
  {
    double[] arrayOfDouble = this.divvy.points[this.divvy.newPoint].textTransform(this.divType);
    for (int i = 0; i < this.players; i++) {
      if (this.divType == "Rent")
      {
        this.history.appendText("     Room " + (i + 1) + "  rent: $" + Math.round(this.totalRent * (arrayOfDouble[(i + 1)] - arrayOfDouble[i])) / 100.0D + "\n");
      }
      else
      {
        this.history.appendText("     Piece " + (i + 1) + ": scalepoints " + arrayOfDouble[i] + " to " + arrayOfDouble[(i + 1)]);
        
        this.history.appendText("\n");
      }
    }
    this.history.appendText("Player " + this.divvy.points[this.divvy.newPoint].getOwner(this.divType) + ", which one would you prefer?");
  }
  
  public void howsThis()
  {
    this.history.appendText("\n\n--- SUGGESTED DIVISION ---\n");
    if (this.divType == "Rent") {
      this.history.appendText("     Total rent: $" + this.totalRent + ".\n");
    }
    double[] arrayOfDouble = this.divvy.dummy.textTransform(this.divvy.suggestedTransform());
    for (int i = 0; i < this.players; i++) {
      if (this.divType == "Rent")
      {
        for (int j = 0; j < this.players; j++) {
          if ((char)(this.alpha + i) == this.divvy.suggestedOwner(j + 1)) {
            this.history.appendText("     Player " + this.divvy.suggestedOwner(j + 1) + 
              " pays $" + Math.round(this.totalRent * (arrayOfDouble[(j + 1)] - arrayOfDouble[j])) / 100.0D + 
              " for Room " + (j + 1) + ".\n");
          }
        }
      }
      else
      {
        this.history.appendText(
          "   Player " + this.divvy.suggestedOwner(i + 1) + "  " + 
          "  Piece " + (i + 1) + ": scalepoints " + arrayOfDouble[i] + " to " + arrayOfDouble[(i + 1)]);
        
        this.history.appendText("\n");
      }
    }
    if ((this.divType == "Cake") || (this.divType == "Chores")) {
      this.history.appendText("(Press 'Continue Iteration' for more precision.)");
    }
    this.history.appendText("\n");
  }
  
  public void initSimplex()
  {
    this.divvy = new Simplex(this.players, this.divType);
    if (this.divType == "Rent") {
      this.divvy.totalRent = this.totalRent;
    }
  }
  
  public void makeSimplex()
  {
    this.divvy = new Simplex(this.players, this.divType);
    if (this.divType == "Rent") {
      this.divvy.totalRent = this.totalRent;
    }
    this.history.appendText("\n");
    if ((this.divType == "Cake") || (this.divType == "Chores")) {
      this.history.appendText("[Note that the graphic above is clickable!]\n");
    }
    this.history.appendText("          ------- Initializing... please wait. -------\n\n");
    try
    {
      URL localURL = new URL(getDocumentBase(), this.divType + ".gif");
      Toolkit localToolkit = Toolkit.getDefaultToolkit();
      this.picture = localToolkit.getImage(localURL);
    }
    catch (MalformedURLException localMalformedURLException)
    {
      this.history.appendText("Caught: " + localMalformedURLException + "\n");
    }
    this.tracker = new MediaTracker(this);
    try
    {
      this.tracker.addImage(this.picture, 0);
      this.tracker.waitForAll();
    }
    catch (Exception localException)
    {
      this.history.appendText("Caught: " + localException);
      this.history.appendText("\nCould not load image.\n\n");
    }
    this.displayPanel.image = this.picture;
    if (this.divType == "Rent")
    {
      this.displayPanel.width = 150;
      this.displayPanel.imagex = 25;
      this.displayPanel.imageWidth = 100;
    }
    else
    {
      this.displayPanel.width = 300;
      this.displayPanel.imagex = 50;
      this.displayPanel.imageWidth = 200;
    }
    this.displayPanel.visible = true;
    repaint();
  }
  
  public void startDivision()
  {
    if ((this.divType == "Cake") || (this.divType == "Chores"))
    {
      this.working = true;
      while ((this.divType == "Chores") && (this.divvy.autoChoose())) {
        this.graduated = this.divvy.bigAl();
      }
      if (this.graduated) {
        this.suggest.enable();
      } else {
        this.suggest.disable();
      }
      tellCuts();
    }
    else if ((this.divType == "Rent") && (this.rentType == "Interactive"))
    {
      this.working = true;
      tellCuts();
    }
    else if ((this.divType == "Rent") && (this.rentType == "Auto-Choose"))
    {
      int i = (int)(Math.log(this.totalRent * 10000) / Math.log(2.0D));
      
      System.out.println("Level: " + i);
      while ((this.divvy.level < i) && (this.divvy.autoChoose(this.bids)))
      {
        for (int j = 0; j < this.players; j++) {
          for (int k = 0; k < this.players; k++) {}
        }
        this.graduated = this.divvy.bigAl();
      }
      howsThis();
    }
    else if ((this.divType == "Rent") && (this.rentType == "HRS"))
    {
      initHRS();
      this.hrsDivision.utilitarian();
      this.hrsDivision.normHRS();
      this.hrsDivision.doHRS();
    }
  }
  
  public void areYouReady()
  {
    if ((this.players != -1) && (this.divType != null)) {
      if (this.divType == "Rent")
      {
        this.history.appendText("Please enter the total rent and press 'Enter'.\n");
        this.gettingRent = true;
      }
      else
      {
        makeSimplex();
        startDivision();
      }
    }
  }
  
  public void startBids()
  {
    this.whoBidding = 0;
    askBids();
    repaint();
  }
  
  public void askBids()
  {
    char c = (char)(this.alpha + this.whoBidding);
    String str = new String("");
    try
    {
      str = str + this.bids[this.whoBidding][0];
      for (int i = 1; i < this.players; i++)
      {
        str = str + ", ";
        str = str + this.bids[this.whoBidding][i];
      }
      this.bidField.setText(str);
    }
    catch (NullPointerException localNullPointerException)
    {
      this.bidField.setText("");
    }
    this.bidPanel.text = ("Player " + c + ", enter or modify your bids:");
    this.bidField.requestFocus();
  }
  
  public void askAgain()
  {
    char c = (char)(this.alpha + this.whoBidding);
    this.bidField.setText("");
    this.bidPanel.text = ("Player " + c + ", please re-enter your bids:");
  }
  
  public boolean parseString(String paramString)
  {
    double[] arrayOfDouble = new double[this.players];
    int i = 0;
    double d1 = 0.0D;
    double d2 = 0.0D;
    int j = 0;
    for (int k = 0; k < paramString.length(); k++) {
      if ((paramString.charAt(k) == ',') || (k == paramString.length() - 1))
      {
        if (k == paramString.length() - 1) {
          k++;
        }
        try
        {
          d2 = Double.valueOf(paramString.substring(j, k).trim()).doubleValue();
        }
        catch (NumberFormatException localNumberFormatException)
        {
          System.out.println(localNumberFormatException);
          return false;
        }
        arrayOfDouble[i] = d2;
        d1 += d2;
        
        i++;
        j = k + 1;
      }
    }
    if (d1 < this.totalRent)
    {
      this.bidsTooSmall = true;
      
      this.history.appendText("\n     Warning: if your bids sum to less than the total rent,\n");
      this.history.appendText("     the solution will still be envy-free, but you\n");
      this.history.appendText("     may have to pay more than what you bid.\n");
      if ((this.cb2.getState()) && (this.rentType == "HRS")) {
        this.history.appendText("  The Average Discount Method cannot be used.\n   *** Please select another option. ***\n");
      }
    }
    this.bids[this.whoBidding] = arrayOfDouble;
    return true;
  }
  
  public void initHRS()
  {
    if (this.exAnte) {
      this.hrsDivision = new hrsUtil(this.bids, this.players, this.history, this.totalRent, 
        this.surplus, this.aveDisMethod);
    } else {
      this.hrsDivision = new hrsCycle(this.bids, this.players, this.history, this.totalRent, 
        this.surplus, this.aveDisMethod);
    }
  }
  
  public void utilitarian()
  {
    this.rNode = new double[this.players];
    this.pNode = new double[this.players];
    this.rPointer = new int[this.players];
    this.pPointer = new int[this.players];
    for (int i = 0; i < this.players; i++)
    {
      this.assignments[i] = i;
      this.rNode[i] = Double.POSITIVE_INFINITY;
      this.pNode[i] = Double.POSITIVE_INFINITY;
      this.finalNode = Double.POSITIVE_INFINITY;
    }
    for (int j = 0; j < this.players + 1; j++)
    {
      for (int k = 0; k < this.players; k++) {}
      updateNodes();
      if (traceBack() != -1)
      {
        changeAssignment();
        for (int m = 0; m < this.players; m++)
        {
          this.rNode[m] = Double.POSITIVE_INFINITY;
          this.pNode[m] = Double.POSITIVE_INFINITY;
          this.finalNode = Double.POSITIVE_INFINITY;
        }
        j = 0;
      }
    }
  }
  
  public void updateNodes()
  {
    for (int i = 0; i < this.players; i++)
    {
      if (this.rNode[i] > 0.0D)
      {
        this.rNode[i] = 0.0D;
        this.rPointer[i] = -1;
      }
      for (j = 0; j < this.players; j++) {
        if ((j != this.assignments[i]) && 
          (this.pNode[j] - this.bids[j][i] < this.rNode[i]))
        {
          this.rNode[i] = (this.pNode[j] - this.bids[j][i]);
          this.rPointer[i] = j;
        }
      }
    }
    for (int j = 0; j < this.players; j++) {
      if (this.rNode[this.assignments[j]] + this.bids[j][this.assignments[j]] < this.pNode[j])
      {
        this.pNode[j] = (this.rNode[this.assignments[j]] + this.bids[j][this.assignments[j]]);
        this.pPointer[j] = this.assignments[j];
      }
    }
    for (int k = 0; k < this.players; k++) {
      if (this.pNode[k] < this.finalNode)
      {
        this.finalNode = this.pNode[k];
        this.finalPointer = k;
      }
    }
  }
  
  public int traceBack()
  {
    boolean[] arrayOfBoolean = new boolean[this.players];
    for (int j = 0; j < this.players; j++) {
      arrayOfBoolean[j] = false;
    }
    int i = this.finalPointer;
    for (int k = 0; k < this.players; k++)
    {
      i = this.pPointer[i];
      i = this.rPointer[i];
      if (i == -1)
      {
        k = this.players;
        
        break;
      }
      if (arrayOfBoolean[i] != 0)
      {
        arrayOfBoolean[i] = true;
        this.inCycle = i;
      }
      else
      {
        arrayOfBoolean[i] = true;
      }
    }
    return i;
  }
  
  public void changeAssignment()
  {
    int i = this.pPointer[this.inCycle];
    for (int j = 0; j < this.players; j++)
    {
      this.assignments[this.rPointer[i]] = i;
      i = this.pPointer[this.rPointer[i]];
    }
  }
  
  public void normHRS()
  {
    for (int i = 0; i < this.players; i++) {
      this.backAssignments[this.assignments[i]] = i;
    }
    int j = 0;
    for (int k = 0; k < this.players; k++)
    {
      this.payment[this.assignments[k]] = this.hrsBids[k][this.assignments[k]];
      this.history.appendText("Player " + (char)(this.alpha + k) + " pays " + this.payment[this.assignments[k]] + " for room " + (this.assignments[k] + 1) + ".\n");
    }
    for (int m = 0; m < this.players; m++)
    {
      for (int n = 0; n < this.players; n++) {
        this.hrsBids[m][n] -= this.payment[n];
      }
      j = (int)(j + this.payment[m]);
    }
    this.surplus = (j - this.totalRent);
    
    this.history.appendText("After rent is paid, there is a surplus of " + this.surplus + "\n");
  }
  
  public void doHRS()
  {
    int i = 1;
    int j = 0;
    while ((i != 0) && (j < this.players))
    {
      for (k = 0; k < this.players; k++) {
        for (m = 0; m < this.players; m++) {
          this.hrsBids[k][m] = (Math.round(10000.0D * this.hrsBids[k][m]) / 10000.0D);
        }
      }
      this.history.appendText("\nStarting new round of compensation:\n");
      checkEnvy();
      i = 0;
      for (int m = 0; m < this.players; m++)
      {
        n = findMax(this.hrsBids[m], m);
        if (n != 0) {
          i = 1;
        }
      }
      for (int n = 0; n < this.players; n++) {
        for (i1 = 0; i1 < this.players; i1++) {
          this.hrsBids[n][i1] += this.compensations[i1];
        }
      }
      for (int i1 = 0; i1 < this.players; i1++) {
        this.compensations[i1] = 0.0D;
      }
      j++;
    }
    for (int k = 0; k < this.players; k++) {}
    if (this.aveDisMethod) {
      averageSurplus();
    } else {
      dealSurplus();
    }
  }
  
  public void checkEnvy()
  {
    for (int i = 0; i < this.players; i++)
    {
      int j = 0;
      for (int k = 0; k < this.players; k++) {
        if (this.hrsBids[i][this.assignments[i]] < this.hrsBids[i][k])
        {
          j = 1;
          break;
        }
      }
      this.envious[i] = j;
      if (this.envious[i] == 0) {
        this.history.appendText("Player " + (char)(this.alpha + i) + " is not envious.\n");
      }
    }
  }
  
  public boolean findMax(double[] paramArrayOfDouble, int paramInt)
  {
    double d = 0.0D;
    for (int i = 0; i < this.players; i++) {
      if ((paramArrayOfDouble[this.assignments[paramInt]] - paramArrayOfDouble[i] < d) && 
        (this.envious[this.backAssignments[i]] == 0))
      {
        d = -1.0D * (paramArrayOfDouble[this.assignments[paramInt]] - paramArrayOfDouble[i]);
        char c1 = (char)(this.alpha + this.backAssignments[i]);
        char c2 = (char)(this.alpha + paramInt);
        this.history.appendText(" Since Player " + c2 + " envies Player " + c1 + ", pay " + Math.round(100.0D * d) / 100.0D + " to " + c2 + "\n");
        this.compensations[this.assignments[paramInt]] += d;
      }
    }
    if (d == 0.0D) {
      return false;
    }
    return true;
  }
  
  public void dealSurplus()
  {
    for (int i = 0; i < this.players; i++)
    {
      this.surplus -= this.hrsBids[i][this.assignments[i]];
      this.payment[this.assignments[i]] -= this.hrsBids[i][this.assignments[i]];
    }
    this.history.appendText("\nDistributing surplus of " + this.surplus + " equally.\n\n");
    for (int j = 0; j < this.players; j++) {
      this.payment[j] -= this.surplus / this.players;
    }
    for (int k = 0; k < this.players; k++) {
      this.history.appendText("Overall, Player " + (char)(this.alpha + k) + " pays " + Math.round(100.0D * this.payment[this.assignments[k]]) / 100.0D + "\n");
    }
  }
  
  public void averageSurplus()
  {
    for (int i = 0; i < this.players; i++)
    {
      this.surplus -= this.hrsBids[i][this.assignments[i]];
      this.payment[this.assignments[i]] -= this.hrsBids[i][this.assignments[i]];
    }
    this.history.appendText("Surplus: " + this.surplus + "\n\n");
    for (int j = 0; j < this.players; j++)
    {
      for (k = 0; k < this.players; k++) {
        for (m = 0; m < this.players; m++) {
          this.aveDisBids[k][m] = this.hrsBids[k][m];
        }
      }
      double d1 = this.surplus;
      int m = 0;
      while (d1 > 0.0D)
      {
        for (n = 0; n < this.players; n++) {
          for (int i1 = 0; i1 < this.players; i1++) {
            this.aveDisBids[n][i1] = (Math.round(10000.0D * this.aveDisBids[n][i1]) / 10000.0D);
          }
        }
        getD(j);
        d1 = findMinDiscount(j, d1);
        d1 = Math.round(d1 * 10000.0D) / 10000.0D;
        
        m++;
      }
      this.history.appendText("Leftover discounts to players: ");
      for (int n = 0; n < this.players; n++)
      {
        double d2 = this.discounts[j][n];
        this.history.appendText(Math.round(100.0D * d2) / 100.0D + ", ");
      }
      this.history.appendText("\n\n");
    }
    averageThem();
    for (int k = 0; k < this.players; k++) {
      this.history.appendText("Overall, Player " + (char)(this.alpha + k) + " pays " + Math.round(100.0D * (this.payment[this.assignments[k]] - this.averages[k])) / 100.0D + "\n");
    }
  }
  
  public void averageThem()
  {
    this.history.appendText("Average leftover discounts to players:\n");
    for (int i = 0; i < this.players; i++)
    {
      double d = 0.0D;
      for (int j = 0; j < this.players; j++) {
        d += this.discounts[j][i];
      }
      this.averages[i] = (d / this.players);
      this.history.appendText(Math.round(100.0D * this.averages[i]) / 100.0D + ", ");
    }
    this.history.appendText("\n\n");
  }
  
  public double findMinDiscount(int paramInt, double paramDouble)
  {
    double d1 = paramDouble;
    double d2 = d1 / this.magD;
    double d3 = 0.0D;
    int i = 0;
    for (int j = 0; j < this.players; j++) {
      if (this.inD[j] != 0) {
        i++;
      }
    }
    int m;
    if (i == this.players)
    {
      for (k = 0; k < this.players; k++) {
        d3 = d1 / this.players;
      }
    }
    else
    {
      d3 = d2;
      for (k = 0; k < this.players; k++) {
        if (this.inD[k] != 0) {
          for (m = 0; m < this.players; m++) {
            if ((this.aveDisBids[m][this.assignments[m]] - this.aveDisBids[m][this.assignments[k]] < d3) && (this.aveDisBids[m][this.assignments[m]] > this.aveDisBids[m][this.assignments[k]]) && (this.inD[m] == 0)) {
              d3 = this.aveDisBids[m][this.assignments[m]] - this.aveDisBids[m][this.assignments[k]];
            }
          }
        }
      }
    }
    for (int k = 0; k < this.players; k++) {
      if (this.inD[k] != 0)
      {
        this.discounts[paramInt][k] += d3;
        for (m = 0; m < this.players; m++) {
          this.aveDisBids[m][this.assignments[k]] += d3;
        }
        d1 -= d3;
      }
    }
    this.history.appendText("Give " + Math.round(d3 * 100.0D) / 100.0D + " to tied set.\n");
    return d1;
  }
  
  public void getD(int paramInt)
  {
    this.magD = 0;
    for (int i = 0; i < this.players; i++) {
      this.inD[i] = false;
    }
    this.inD[paramInt] = true;
    int j = 1;
    for (; j != 0; k < this.players)
    {
      j = 0;
      k = 0; continue;
      if (this.inD[k] == 0) {
        for (int m = 0; m < this.players; m++) {
          if ((this.aveDisBids[k][this.assignments[k]] == this.aveDisBids[k][this.assignments[m]]) && (this.inD[m] != 0))
          {
            this.inD[k] = true;
            this.magD += 1;
            j = 1;
          }
        }
      }
      k++;
    }
    this.history.appendText("Now ");
    for (int k = 0; k < this.players; k++) {
      if (this.inD[k] != 0) {
        this.history.appendText((char)(this.alpha + k) + ", ");
      }
    }
    this.history.appendText("in tied set.\n");
  }
  
  public void debugArray()
  {
    for (int i = 0; i < this.players; i++)
    {
      for (int j = 0; j < this.players; j++) {
        this.history.appendText(this.hrsBids[i][j] + ", ");
      }
      this.history.appendText("\n");
    }
    this.history.appendText("\n\n");
  }
  
  public void debugArray(int paramInt)
  {
    for (int i = 0; i < this.players; i++) {
      this.history.appendText(this.hrsBids[paramInt][i] + ", ");
    }
    this.history.appendText("\n\n");
  }
  
  void makeImageBuffer()
  {
    this.image = createImage(size().width, size().height);
    this.graphics = this.image.getGraphics();
    clear();
  }
  
  void clear()
  {
    this.graphics.setColor(this.backgroundColor);
    this.graphics.fillRect(0, 0, size().width, size().height);
    this.graphics.drawRect(0, 0, size().width - 1, size().height - 1);
  }
  
  public void update(Graphics paramGraphics)
  {
    if (this.graphics == null) {
      makeImageBuffer();
    }
    this.outputPanel.paint(this.graphics);
    this.inputPanel.paint(this.graphics, this);
    this.controlPanel.paint(this.graphics, this);
    this.displayPanel.paint(this.graphics, this);
    this.configPanel.paint(this.graphics, this);
    this.rentPanel.paint(this.graphics, this);
    this.bidPanel.paint(this.graphics, this);
    this.bidField.show(this.bidPanel.visible);
    
    this.cb1.show((this.bidPanel.visible) && (this.rentType == "HRS"));
    this.cb2.show((this.bidPanel.visible) && (this.rentType == "HRS"));
    this.cb3.show((this.bidPanel.visible) && (this.rentType == "HRS"));
    
    paramGraphics.drawImage(this.image, 0, 0, this);
  }
  
  public void paint(Graphics paramGraphics)
  {
    update(paramGraphics);
  }
}
