import {Culture,Cult,Concept,Range,Weapon,Ammo,Armor,Item,Potential,Rank} from "./";

export class Character {
    name : string = "";
    playerName : string = "";
    creationDate : Date= new Date();
    deathDate : Date= new Date();
    deathCause : string = "";
    experience : {
        total : number,
        remaining : number
    };
    age : number = 0;
    birthLocation : string = "";
    height : number = 0;
    weight : number = 0;
    skinColor : string = "";
    hairColor : string = "";
    portrait : string = "";
    backgroundStory : string = "";
    money : number = 0;
    culture : Culture = new Culture();
    cult : Cult = new Cult();
    rank : Rank = new Rank();
    concept : Concept = new Concept();
    
    health : {
        ego : Range,
        sporulations : Range,
        wounds : Range,
        trauma : Range
    };

    PHY : {
        base : Range,
        athletisme : Range,
        corpsacorps : Range,
        force : Range,
        lutte : Range,
        resistance : Range,
        vigueur : Range
    };

    AGI : {
        base : Range,
        armesaprojectiles : Range,
        artisanat : Range,
        dexterite : Range,
        furtivite : Range,
        mobilite : Range,
        navigation : Range
    };

    CHA : {
        base : Range,
        art : Range,
        commandement : Range,
        consideration : Range,
        expression : Range,
        negociation : Range,
        seduction : Range
    };

    INT : {
        base : Range,
        concentration : Range,
        connaissancesart : Range,
        legendes : Range,
        medecine : Range,
        science : Range,
        technologie : Range
    };

    PSY : {
        base : Range,
        domination : Range,
        foi : Range,
        reactivite : Range,
        ruse : Range,
        tromperie : Range,
        volonte : Range
    };

    INS : {
        base : Range, 
        dressage : Range,
        empathie : Range,
        orientation : Range,
        perception : Range,
        pulsions : Range,
        survie : Range
    };

    historique : {
        allies : Range,
        autorite : Range,
        renommee : Range,
        reseau : Range,
        ressources : Range,
        secrets : Range
    };

    weapons : Array<Weapon> = [];
    ammo : Array<Ammo> = [];
    armors : Array<Armor> = [];
    items : Array<Item> = [];
    potentials : Array<Potential> = [];

    constructor(){
        this.experience = {
            total : 0,
            remaining : 0
        };

        this.health = {
            ego : new Range(0,24),
            sporulations : new Range(0,24),
            wounds : new Range(0,24),
            trauma : new Range(0,12)
        };
        this.reinitPoints();        
    }

    reinitPoints(){
        this.PHY = {
            base : new Range(0,6,0,2),
            athletisme : new Range(0,6,0,2),
            corpsacorps : new Range(0,6,0,2),
            force : new Range(0,6,0,2),
            lutte : new Range(0,6,0,2),
            resistance : new Range(0,6,0,2),
            vigueur : new Range(0,6,0,2)
        };
    
        this.AGI = {
            base : new Range(0,6,0,2),
            armesaprojectiles : new Range(0,6,0,2),
            artisanat : new Range(0,6,0,2),
            dexterite : new Range(0,6,0,2),
            furtivite : new Range(0,6,0,2),
            mobilite : new Range(0,6,0,2),
            navigation : new Range(0,6,0,2)
        };
    
        this.CHA = {
            base : new Range(0,6,0,2),
            art : new Range(0,6,0,2),
            commandement : new Range(0,6,0,2),
            consideration : new Range(0,6,0,2),
            expression : new Range(0,6,0,2),
            negociation : new Range(0,6,0,2),
            seduction : new Range(0,6,0,2)
        };
    
        this.INT = {
            base : new Range(0,6,0,2),
            concentration : new Range(0,6,0,2),
            connaissancesart : new Range(0,6,0,2),
            legendes : new Range(0,6,0,2),
            medecine : new Range(0,6,0,2),
            science : new Range(0,6,0,2),
            technologie : new Range(0,6,0,2)
        };
    
        this.PSY = {
            base : new Range(0,6,0,2),
            domination : new Range(0,6,0,2),
            foi : new Range(0,6,0,2),
            reactivite : new Range(0,6,0,2),
            ruse : new Range(0,6,0,2),
            tromperie : new Range(0,6,0,2),
            volonte : new Range(0,6,0,2)
        };
    
        this.INS = {
            base : new Range(0,6,0,2), 
            dressage : new Range(0,6,0,2),
            empathie : new Range(0,6,0,2),
            orientation : new Range(0,6,0,2),
            perception : new Range(0,6,0,2),
            pulsions : new Range(0,6,0,2),
            survie : new Range(0,6,0,2)
        };
    
        this.historique = {
            allies : new Range(0,6,0,3),
            autorite : new Range(0,6,0,3),
            renommee : new Range(0,6,0,3),
            reseau : new Range(0,6,0,3),
            ressources : new Range(0,6,0,3),
            secrets : new Range(0,6,0,3)
        };
    }

    setCulture(newCulture? : Culture){
        if(!newCulture) var newCulture = this.culture;
        if(newCulture && newCulture.bonus){
            newCulture.bonus.attribute.forEach(b => {
                this[b].base.upper++; 
            });
            newCulture.bonus.competence.forEach(b => {
                b.c.forEach(c => {
                    this[b.a][c].upper++;
                });
            });
            this.culture = newCulture;
        }
    }

    setCult(newCult? : Cult){
        if(!newCult) var newCult = this.cult;
        if(newCult && newCult.bonus){
            newCult.bonus.forEach(b => {
                b.c.forEach(c => {
                    this[b.a][c].upper++;
                });
            });
            this.cult = newCult;
        }
    }

    setConcept(newConcept? : Concept){
        if(!newConcept) var newConcept = this.concept;
        if(newConcept && newConcept.bonus){
            this[newConcept.bonus.attribute].base.upper++;
            newConcept.bonus.competence.forEach(b => {
                b.c.forEach(c => {
                    this[b.a][c].upper++;
                });
            });
            this.concept = newConcept;
        }
    }

    changeCulture(culture : Culture){
        this.reinitPoints();
        this.setCulture(culture);
        this.setCult();
        this.setConcept();
    }

    changeCult(cult : Cult){
        this.reinitPoints();
        this.setCulture();
        this.setCult(cult);
        this.setConcept();
    }

    changeConcept(concept : Concept){
        this.reinitPoints();
        this.setCulture();
        this.setCult();
        this.setConcept(concept);
    }

    getAttributesCount():number{
        return this.PHY.base.lower + this.AGI.base.lower + this.CHA.base.lower + this.INT.base.lower + this.PSY.base.lower + this.INS.base.lower;
    }

    getCompetencesCount():number{
        var count = 0;
        Object.keys(this.PHY).forEach(key=>{ if(key != "base") count += this.PHY[key].lower;});
        Object.keys(this.AGI).forEach(key=>{ if(key != "base") count += this.AGI[key].lower;});
        Object.keys(this.CHA).forEach(key=>{ if(key != "base") count += this.CHA[key].lower;});
        Object.keys(this.INT).forEach(key=>{ if(key != "base") count += this.INT[key].lower;});
        Object.keys(this.PSY).forEach(key=>{ if(key != "base") count += this.PSY[key].lower;});
        Object.keys(this.INS).forEach(key=>{ if(key != "base") count += this.INS[key].lower;});
        return count;
    }

    getHistoryCount():number{
        var count = 0;
        Object.keys(this.historique).forEach(key=>{ count += this.historique[key].lower;});
        return count;
    }
}