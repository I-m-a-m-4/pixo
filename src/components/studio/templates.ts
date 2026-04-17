export interface TemplateElement {
    type: 'text' | 'rect' | 'circle' | 'image' | 'path';
    text?: string;
    fontSize?: number;
    fontWeight?: string | number;
    fontFamily?: string;
    fill?: string;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    radius?: number;
    opacity?: number;
    charSpacing?: number;
    lineHeight?: number;
    originX?: string;
    originY?: string;
    src?: string;
    path?: string;
    stroke?: string;
    strokeWidth?: number;
    selectable?: boolean;
    angle?: number;
    fontStyle?: 'normal' | 'italic' | 'oblique';
}

export interface Template {
    id: number;
    name: string;
    tag: string;
    canvasWidth: number;
    canvasHeight: number;
    backgroundColor: string;
    previewImage: string;
    elements: TemplateElement[];
}

export const TEMPLATES: Template[] = [
    {
        id: 1,
        name: "Market Strategy",
        tag: "MODERN",
        canvasWidth: 1080,
        canvasHeight: 1350,
        backgroundColor: "#ffffff",
        previewImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop",
        elements: [
            {
                type: 'image',
                src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
                width: 1080,
                opacity: 1,
                selectable: false,
                top: 0,
                left: 0
            },
            {
                type: 'rect',
                width: 1080,
                height: 1350,
                fill: '#000000',
                opacity: 0.4,
                left: 0,
                top: 0,
                selectable: false
            },
            {
                type: 'text',
                text: "STRATEGY // 01",
                left: 90,
                top: 180,
                fontSize: 16,
                fontWeight: 'bold',
                fill: '#22ad2c',
                fontFamily: 'Inter',
                charSpacing: 400
            },
            {
                type: 'text',
                text: "SCALE YOUR\nBUSINESS\nFAST",
                left: 85,
                top: 220,
                fontSize: 120,
                fontWeight: '900',
                fill: 'white',
                fontFamily: 'Plus Jakarta Sans',
                charSpacing: -40,
                lineHeight: 0.85
            },
            {
                type: 'rect',
                width: 140,
                height: 8,
                fill: '#22ad2c',
                left: 90,
                top: 560
            },
            {
                type: 'text',
                text: "A comprehensive guide to building autonomous\naesthetics in the modern digital landscape. Engage\ncaptivate, and convert.",
                left: 90,
                top: 620,
                fontSize: 24,
                fill: '#eeeeee',
                fontFamily: 'Inter',
                lineHeight: 1.4
            },
            {
                type: 'rect',
                width: 1080,
                height: 100,
                fill: '#ffffff',
                opacity: 0.1,
                left: 0,
                top: 1250,
                selectable: false
            },
            {
                type: 'text',
                text: "PIXO STUDIO © 2026",
                left: 90,
                top: 1285,
                fontSize: 14,
                fontWeight: 'bold',
                fill: '#ffffff',
                fontFamily: 'Inter',
                opacity: 0.8,
                charSpacing: 200
            }
        ]
    },
    {
        id: 2,
        name: "Minimal Luxury",
        tag: "PREMIUM",
        canvasWidth: 1080,
        canvasHeight: 1350,
        backgroundColor: "#f9f9f9",
        previewImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop",
        elements: [
            {
                type: 'image',
                src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
                width: 1080,
                opacity: 0.1,
                selectable: false,
                top: 0,
                left: 0
            },
            {
                type: 'rect',
                width: 960,
                height: 1230,
                left: 60,
                top: 60,
                fill: 'transparent',
                stroke: '#111111',
                strokeWidth: 2,
                opacity: 0.1,
                selectable: false
            },
            {
                type: 'text',
                text: "THE ART OF\nLESS.",
                left: 120,
                top: 180,
                fontSize: 110,
                fontWeight: 'normal',
                fill: '#111111',
                fontFamily: 'Playfair Display',
                lineHeight: 0.9,
                charSpacing: -20
            },
            {
                type: 'rect',
                width: 80,
                height: 2,
                fill: '#22ad2c',
                left: 120,
                top: 400
            },
            {
                type: 'text',
                text: "Curating the essence of modern aesthetics\nthrough subtraction. True luxury is found\nin what you leave behind.",
                left: 120,
                top: 460,
                fontSize: 24,
                fill: '#555555',
                fontFamily: 'Inter',
                lineHeight: 1.6
            },
            {
                type: 'text',
                text: "EST. 2026",
                left: 120,
                top: 1180,
                fontSize: 12,
                fill: '#111111',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                charSpacing: 300
            }
        ]
    },
    {
        id: 3,
        name: "Tech Innovator",
        tag: "STARTUP",
        canvasWidth: 1080,
        canvasHeight: 1350,
        backgroundColor: "#050505",
        previewImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop",
        elements: [
            {
                type: 'image',
                src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
                width: 1080,
                opacity: 0.3,
                selectable: false,
                top: 0,
                left: 0
            },
            {
                type: 'text',
                text: "TECH\nSTACK",
                left: 100,
                top: 150,
                fontSize: 160,
                fontWeight: '900',
                fill: '#22ad2c',
                fontFamily: 'Plus Jakarta Sans',
                lineHeight: 0.8,
                charSpacing: -40
            },
            {
                type: 'rect',
                width: 400,
                height: 4,
                fill: 'white',
                left: 100,
                top: 420
            },
            {
                type: 'text',
                text: "BUILDING THE FUTURE OF AI",
                left: 100,
                top: 450,
                fontSize: 22,
                fill: 'white',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                charSpacing: 100
            },
            {
                type: 'text',
                text: "Deploying high-performance architectural\nsolutions for the autonomous web.",
                left: 100,
                top: 550,
                fontSize: 32,
                fill: '#aaaaaa',
                fontFamily: 'Inter',
                lineHeight: 1.4
            }
        ]
    },
    {
        id: 4,
        name: "Product Showcase",
        tag: "E-COMMERCE",
        canvasWidth: 1080,
        canvasHeight: 1350,
        backgroundColor: "#ffffff",
        previewImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop",
        elements: [
            {
                type: 'rect',
                width: 1080,
                height: 600,
                fill: '#f4f4f4',
                left: 0,
                top: 0,
                selectable: false
            },
            {
                type: 'image',
                src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
                width: 800,
                top: 100,
                left: 140
            },
            {
                type: 'text',
                text: "NEW ARRIVAL",
                left: 540,
                top: 750,
                fontSize: 24,
                fontWeight: 'bold',
                fill: '#22ad2c',
                fontFamily: 'Inter',
                charSpacing: 300,
                originX: 'center'
            },
            {
                type: 'text',
                text: "MINIMALIST\nWATCH",
                left: 540,
                top: 800,
                fontSize: 90,
                fontWeight: '900',
                fill: '#111111',
                fontFamily: 'Plus Jakarta Sans',
                lineHeight: 0.9,
                originX: 'center'
            },
            {
                type: 'text',
                text: "Precision meets aesthetics. A masterpiece of\nmodern engineering on your wrist.",
                left: 540,
                top: 1050,
                fontSize: 28,
                fill: '#666666',
                fontFamily: 'Inter',
                lineHeight: 1.5,
                originX: 'center'
            },
            {
                type: 'rect',
                width: 300,
                height: 80,
                fill: '#111111',
                left: 390,
                top: 1180,
                radius: 40
            },
            {
                type: 'text',
                text: "SHOP NOW",
                left: 540,
                top: 1205,
                fontSize: 20,
                fontWeight: 'bold',
                fill: 'white',
                fontFamily: 'Inter',
                originX: 'center'
            }
        ]
    },
    {
        id: 5,
        name: "Morning Vibes",
        tag: "SOCIAL",
        canvasWidth: 1080,
        canvasHeight: 1350,
        backgroundColor: "#fffbeb",
        previewImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop",
        elements: [
            {
                type: 'image',
                src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
                width: 1080,
                top: 0,
                left: 0,
                selectable: false
            },
            {
                type: 'rect',
                width: 1080,
                height: 1350,
                fill: '#000000',
                opacity: 0.2,
                left: 0,
                top: 0,
                selectable: false
            },
            {
                type: 'text',
                text: "Good Morning,",
                left: 540,
                top: 400,
                fontSize: 100,
                fontWeight: 'normal',
                fill: 'white',
                fontFamily: 'Playfair Display',
                originX: 'center',
                fontStyle: 'italic'
            },
            {
                type: 'text',
                text: "START YOUR DAY\nWITH PIXO",
                left: 540,
                top: 550,
                fontSize: 80,
                fontWeight: '900',
                fill: 'white',
                fontFamily: 'Plus Jakarta Sans',
                originX: 'center',
                lineHeight: 1
            },
            {
                type: 'rect',
                width: 80,
                height: 8,
                fill: '#22ad2c',
                left: 500,
                top: 780
            }
        ]
    },
    {
        id: 6,
        name: "Agency Portfolio",
        tag: "CREATIVE",
        canvasWidth: 1080,
        canvasHeight: 1350,
        backgroundColor: "#ffffff",
        previewImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&auto=format&fit=crop",
        elements: [
            {
                type: 'rect',
                width: 500,
                height: 1350,
                fill: '#111111',
                left: 0,
                top: 0,
                selectable: false
            },
            {
                type: 'text',
                text: "CREATIVE\nAGENCY",
                left: 80,
                top: 150,
                fontSize: 90,
                fontWeight: '900',
                fill: 'white',
                fontFamily: 'Plus Jakarta Sans',
                lineHeight: 0.85
            },
            {
                type: 'rect',
                width: 300,
                height: 12,
                fill: '#22ad2c',
                left: 80,
                top: 350
            },
            {
                type: 'text',
                text: "WE BUILD\nDIGITAL\nEXPERIENCES",
                left: 580,
                top: 600,
                fontSize: 70,
                fontWeight: '900',
                fill: '#111111',
                fontFamily: 'Plus Jakarta Sans',
                lineHeight: 1
            },
            {
                type: 'image',
                src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
                width: 400,
                top: 600,
                left: 80
            },
            {
                type: 'text',
                text: "VIEW PROJECTS",
                left: 580,
                top: 950,
                fontSize: 20,
                fontWeight: 'bold',
                fill: '#22ad2c',
                fontFamily: 'Inter',
                charSpacing: 200
            }
        ]
    }
];
