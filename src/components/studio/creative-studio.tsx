'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { HexColorPicker } from "react-colorful";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TEMPLATES, TemplateElement } from './templates';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sparkles,
    Layers,
    Type,
    Square,
    Image as ImageIcon,
    Palette,
    Trash2,
    Download,
    ChevronRight,
    Search,
    Maximize2,
    Zap,
    Bot,
    MousePointer2,
    Blend,
    Undo2,
    Redo2,
    Star,
    Triangle,
    ArrowRight,
    ArrowLeft,
    Hexagon,
    Octagon,
    Bold,
    Italic,
    Underline,
    Type as TextIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Copy,
    PlusSquare,
    Lock,
    Unlock,
    MoreHorizontal,
    MoveUp,
    MoveDown,
    Strikethrough,
    List,
    Cloud,
    Share2,
    LayoutTemplate,
    Component,
    CloudUpload,
    Wrench,
    FolderOpen,
    Gamepad2,
    Wand2,
    Settings2,
    Minus,
    Plus,
    Monitor,
    HelpCircle,
    Play,
    Crown,
    Mic,
    Eraser,
    Crop,
    FlipHorizontal,
    FlipVertical,
    PaintRoller,
    MessageSquare,
    SlidersHorizontal,
    ChevronDown,
    Image as ImageIconComp,
    Shapes,
    LayoutGrid,
    Video,
    Music,
    Table as TableIcon,
    Box,
    Pipette,
    Check,
    Droplet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuLabel,
    DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

// --- Types ---
type DesignGenre = 'cinematic_vortex' | 'glass_pulse' | 'tech_minimal' | 'neon_vibe';
type SidebarTab = 'templates' | 'elements' | 'text' | 'brand' | 'uploads' | 'tools' | 'projects' | 'apps' | 'magic_media' | 'background';

const GENRES: Record<DesignGenre, {
    name: string;
    description: string;
    colors: string[];
    fonts: string[];
    vibe: string;
}> = {
    cinematic_vortex: {
        name: "Vortex Cinematic",
        description: "High-impact, cinematic lighting with dramatic textures (like your reference).",
        colors: ["#000000", "#1a1a1a", "#ffffff", "#00d1ff"],
        fonts: ["'Plus Jakarta Sans'", "serif"],
        vibe: "Dramatic, Gritty, Bold"
    },
    glass_pulse: {
        name: "Glass Pulse",
        description: "Modern frosted glass, soft neon glows, and minimalist aesthetics.",
        colors: ["#0a0a0b", "#161618", "#3b82f6", "#ffffff"],
        fonts: ["'Inter'", "sans-serif"],
        vibe: "Sleek, Future, Soft"
    },
    tech_minimal: {
        name: "Tech Minimal",
        description: "Clean Swiss typography, professional grids, and deep charcoal tones.",
        colors: ["#050505", "#111111", "#222222", "#ffffff"],
        fonts: ["'Geist'", "monospace"],
        vibe: "Precision, High-Tech, Pro"
    },
    neon_vibe: {
        name: "Neon Vibe",
        description: "Cyberpunk energy with high-contrast vibrant accents.",
        colors: ["#000000", "#09090b", "#ec4899", "#8b5cf6"],
        fonts: ["'Plus Jakarta Sans'", "sans-serif"],
        vibe: "Energetic, Fast, Bold"
    }
};

const ColorPickerPanel = ({ currentColor, onChange, documentColors, setShowColorPicker, showColorPicker }: { currentColor: string, onChange: (c: string) => void, documentColors: string[], setShowColorPicker: (s: boolean) => void, showColorPicker: boolean }) => (
    <PopoverContent className="w-80 bg-white border-gray-200 p-0 shadow-2xl overflow-hidden border">
        <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Document Colors</h3>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary hover:bg-primary/10">Add +</Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
                <div
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group"
                >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Plus size={14} className="text-gray-600 group-hover:text-primary transition-colors" />
                    </div>
                </div>
                {documentColors.map((c, i) => (
                    <div
                        key={i}
                        onClick={() => onChange(c)}
                        className={`w-8 h-8 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform shadow-sm ${currentColor === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-white' : ''}`}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>

            {showColorPicker && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="custom-color-picker flex flex-col items-center">
                        <HexColorPicker
                            color={currentColor || '#000000'}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded border border-gray-200 shrink-0 shadow-sm"
                            style={{ backgroundColor: currentColor }}
                        />
                        <Input
                            value={currentColor || '#000000'}
                            onChange={(e) => onChange(e.target.value)}
                            className="h-8 bg-gray-50 border-gray-200 text-xs font-mono uppercase text-gray-900"
                        />
                        <Pipette size={14} className="text-gray-400 cursor-pointer hover:text-primary transition-colors" />
                    </div>
                </div>
            )}
        </div>
        <div className="p-4 bg-gray-50">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Default Palette</h3>
            <div className="grid grid-cols-8 gap-1.5">
                {['#000000', '#545454', '#737373', '#a6a6a6', '#d9d9d9', '#ffffff', '#ff3131', '#ff5757', '#ff66c4', '#cb6ce6', '#8c52ff', '#5e17eb', '#0097b2', '#0cc0df', '#5ce1e6', '#38b6ff', '#5271ff', '#004aad', '#00bf63', '#7ed957', '#c1ff72', '#ffde59', '#ffbd59', '#ff914d'].map(c => (
                    <div
                        key={c}
                        onClick={() => onChange(c)}
                        className="aspect-square rounded shadow-sm cursor-pointer hover:scale-125 transition-transform border border-black/10"
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>
        </div>
    </PopoverContent>
);

export default function CreativeStudio() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedGenre, setSelectedGenre] = useState<DesignGenre>('cinematic_vortex');
    const [isAIGenerating, setIsAIGenerating] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
    const [layers, setLayers] = useState<fabric.Object[]>([]);
    const [activeTab, setActiveTab] = useState<SidebarTab>('templates');
    const [zoom, setZoom] = useState(66);
    const [canvasWidth, setCanvasWidth] = useState(800);
    const [canvasHeight, setCanvasHeight] = useState(800);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [fontSearch, setFontSearch] = useState("");
    const [selectedObjectProps, setSelectedObjectProps] = useState<any>(null);
    const [objectMenuPosition, setObjectMenuPosition] = useState<{ x: number, y: number } | null>(null);
    const [isProcessingHistory, setIsProcessingHistory] = useState(false);
    const [projectTitle, setProjectTitle] = useState("Vortex Design Strategy - Pixo");
    const [elementsCategory, setElementsCategory] = useState<string | null>(null);
    const [customResizeWidth, setCustomResizeWidth] = useState(800);
    const [customResizeHeight, setCustomResizeHeight] = useState(800);
    const [pages, setPages] = useState<{ id: string, name: string }[]>([{ id: uuidv4(), name: 'Page 1' }]);
    const [activePageId, setActivePageId] = useState<string | null>(null);
    const [documentColors, setDocumentColors] = useState<string[]>(['#000000', '#ffffff', '#FF5733', '#00ffcc', '#8b5cf6']);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, target: fabric.Object | null } | null>(null);
    const fabricCanvases = useRef<Map<string, fabric.Canvas>>(new Map());

    // Alias for compatibility with existing functions (points to active canvas)
    const fabricCanvas = {
        get current() {
            return activePageId ? fabricCanvases.current.get(activePageId) : null;
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('pixo-uploads');
        if (saved) {
            try {
                setUploadedImages(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load uploads", e);
            }
        }
    }, []);

    useEffect(() => {
        if (uploadedImages.length > 0) {
            // Take only last 8 images to avoid localStorage limit (5MB)
            const subset = uploadedImages.slice(0, 8);
            localStorage.setItem('pixo-uploads', JSON.stringify(subset));
        }
    }, [uploadedImages]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const dataUrl = event.target?.result as string;
                setUploadedImages(prev => [dataUrl, ...prev]);

                try {
                    const img = await fabric.FabricImage.fromURL(dataUrl);
                    img.scaleToWidth(300);
                    fabricCanvas.current?.add(img);
                    fabricCanvas.current?.centerObject(img);
                    fabricCanvas.current?.setActiveObject(img);
                    fabricCanvas.current?.renderAll();
                    updateLayers();
                    saveState();
                } catch (err) {
                    console.error("Failed to add image to canvas", err);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const saveState = () => {
        if (isProcessingHistory || !fabricCanvas.current) return;
        const json = JSON.stringify(fabricCanvas.current.toJSON());
        setHistory(prev => {
            const newHistory = prev.slice(0, historyIndex + 1);
            return [...newHistory, json].slice(-50); // Limit to 50 states
        });
        setHistoryIndex(prev => prev + 1);
    };

    const updateLayers = () => {
        if (fabricCanvas.current) {
            setLayers([...fabricCanvas.current.getObjects()].reverse());
        }
    };

    // Sync selected object properties to state for UI updates
    const syncSelectedProps = (obj: any) => {
        if (!obj) {
            setSelectedObjectProps(null);
            return;
        }

        if (obj.type === 'i-text') {
            setSelectedObjectProps({
                type: 'text',
                fontFamily: obj.fontFamily,
                fontSize: obj.fontSize,
                fontWeight: obj.fontWeight,
                fontStyle: obj.fontStyle,
                underline: obj.underline,
                fill: obj.fill,
                textAlign: obj.textAlign,
            });
        } else if (obj.type === 'image' || obj.type === 'fabric.Image') {
            setSelectedObjectProps({
                type: 'image',
                opacity: obj.opacity,
                flipX: obj.flipX,
                flipY: obj.flipY,
            });
        } else {
            setSelectedObjectProps({
                type: obj.type,
                fill: obj.fill,
                opacity: obj.opacity,
            });
        }

        // Calculate position for floating menu
        if (fabricCanvas.current) {
            const activeObject = obj;
            const canvas = fabricCanvas.current;
            const pointer = activeObject.getBoundingRect(true);
            const zoom = canvas.getZoom();

            // Adjust for canvas offset and scrolling
            const canvasElement = canvas.getElement();
            const rect = canvasElement.getBoundingClientRect();

            setObjectMenuPosition({
                x: rect.left + pointer.left + (pointer.width / 2),
                y: rect.top + pointer.top - 50
            });
        }
    };

    // Initialize Canvas for each page
    useEffect(() => {
        pages.forEach((page, index) => {
            const canvasEl = document.getElementById(`canvas-${page.id}`) as HTMLCanvasElement;
            const existingCanvas = fabricCanvases.current.get(page.id);

            if (canvasEl && !existingCanvas) {
                const canvas = new fabric.Canvas(canvasEl, {
                    width: canvasWidth,
                    height: canvasHeight,
                    backgroundColor: '#ffffff',
                    preserveObjectStacking: true,
                    fireRightClick: true, // Enable right click events
                    stopContextMenu: true, // Prevent default browser context menu
                });

                // Context Menu Listener via Fabric natively
                canvas.on('mouse:down', (e) => {
                    setActivePageId(page.id);
                    // Right click is button 2 on native MouseEvent
                    if ((e.e as MouseEvent).button === 2) {
                        if (e.target) {
                            // Cast the native event to MouseEvent to access clientX/Y
                            const nativeEvent = e.e as MouseEvent;
                            setContextMenu({ x: nativeEvent.clientX, y: nativeEvent.clientY, target: e.target });
                            canvas.setActiveObject(e.target);
                            canvas.renderAll();
                        } else {
                            setContextMenu(null);
                        }
                    } else {
                        setContextMenu(null);
                    }
                });

                // (Removed separate mousedown listener since it is merged above)


                canvas.on('selection:created', (e) => {
                    setActivePageId(page.id);
                    setSelectedObject(e.selected?.[0] || null);
                    syncSelectedProps(e.selected?.[0] || null);
                });
                canvas.on('selection:updated', (e) => {
                    setSelectedObject(e.selected?.[0] || null);
                    syncSelectedProps(e.selected?.[0] || null);
                });
                canvas.on('selection:cleared', () => {
                    setSelectedObject(null);
                    syncSelectedProps(null);
                    setObjectMenuPosition(null);
                });
                canvas.on('object:moving', (e) => syncSelectedProps(e.target));
                canvas.on('object:scaling', (e) => syncSelectedProps(e.target));
                canvas.on('object:rotating', (e) => syncSelectedProps(e.target));

                canvas.on('object:added', () => {
                    updateLayers();
                    saveState();
                });
                canvas.on('object:removed', () => {
                    updateLayers();
                    saveState();
                });
                canvas.on('object:modified', saveState);

                if (index === 0) {
                    applyGenreAesthetics(canvas, 'cinematic_vortex');
                }

                fabricCanvases.current.set(page.id, canvas);
                if (!activePageId) setActivePageId(page.id);
            } else if (existingCanvas) {
                // Update size if it changed
                if (existingCanvas.width !== canvasWidth || existingCanvas.height !== canvasHeight) {
                    existingCanvas.setDimensions({
                        width: canvasWidth,
                        height: canvasHeight
                    });
                    existingCanvas.renderAll();
                }
            }
        });

        // Cleanup dropped pages
        const pageIds = new Set(pages.map(p => p.id));
        fabricCanvases.current.forEach((canvas, id) => {
            if (!pageIds.has(id)) {
                canvas.dispose();
                fabricCanvases.current.delete(id);
            }
        });
    }, [pages, canvasWidth, canvasHeight]);



    // Dynamic Font Loading
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${GOOGLE_FONTS.join('|').replace(/ /g, '+')}&display=swap`;
        document.head.appendChild(link);

        // Ensure canvases re-render when fonts are loaded
        const handleFontsLoaded = () => {
            fabricCanvases.current.forEach(canvas => canvas.renderAll());
        };
        document.fonts.ready.then(handleFontsLoaded);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const applyGenreAesthetics = (canvas: fabric.Canvas, genre: DesignGenre) => {
        const config = GENRES[genre];
        canvas.backgroundColor = config.colors[0];
        // Ensure all layers are visible against the new background
        canvas.renderAll();
    };

    // React to zoom changes
    useEffect(() => {
        if (fabricCanvas.current) {
            const canvas = fabricCanvas.current;
            canvas.setZoom(zoom / 100);
            canvas.setDimensions({
                width: canvasWidth * (zoom / 100),
                height: canvasHeight * (zoom / 100)
            });
            canvas.renderAll();
        }
    }, [zoom, canvasWidth, canvasHeight]);

    // --- Actions ---
    const addText = (text: string = "reduce reuse recycle", options: any = {}) => {
        if (!fabricCanvas.current) return;
        const config = GENRES[selectedGenre];
        const itext = new fabric.IText(text, {
            left: 200,
            top: 300,
            fontFamily: config.fonts[0],
            fill: config.colors[2],
            fontSize: 40,
            fontWeight: 'normal',
            textAlign: 'center',
            ...options
        });
        fabricCanvas.current.add(itext);
        fabricCanvas.current.centerObject(itext);
        fabricCanvas.current.setActiveObject(itext);
        fabricCanvas.current.renderAll();
    };

    const addCircle = () => {
        if (!fabricCanvas.current) return;
        const config = GENRES[selectedGenre];
        const circle = new fabric.Circle({
            radius: 100,
            fill: config.colors[1] || '#FF5733',
            left: 300,
            top: 300,
            opacity: 0.8
        });
        fabricCanvas.current.add(circle);
        fabricCanvas.current.centerObject(circle);
    };

    const addRect = (rounded: boolean = false) => {
        if (!fabricCanvas.current) return;
        const config = GENRES[selectedGenre];
        const rect = new fabric.Rect({
            width: 200,
            height: 200,
            fill: config.colors[1] || '#FF5733',
            left: 300,
            top: 300,
            rx: rounded ? 20 : 0,
            ry: rounded ? 20 : 0
        });
        fabricCanvas.current.add(rect);
        fabricCanvas.current.centerObject(rect);
    };

    const addTriangle = () => {
        if (!fabricCanvas.current) return;
        const config = GENRES[selectedGenre];
        const tri = new fabric.Triangle({
            width: 200,
            height: 200,
            fill: config.colors[1] || '#FF5733',
            left: 300,
            top: 300
        });
        fabricCanvas.current.add(tri);
        fabricCanvas.current.centerObject(tri);
    };

    const addLine = (strokeDashArray: number[] | null = null, hasArrow: boolean = false) => {
        if (!fabricCanvas.current) return;

        const line = new fabric.Line([0, 0, 200, 0], {
            stroke: 'white',
            strokeWidth: 4,
            strokeDashArray: strokeDashArray as any,
            padding: 10
        });

        if (hasArrow) {
            const arrowHead = new fabric.Triangle({
                width: 15,
                height: 15,
                fill: 'white',
                left: 190,
                top: -6,
                angle: 90
            });
            const group = new fabric.Group([line, arrowHead], {
                left: 300,
                top: 300
            });
            fabricCanvas.current.add(group);
            fabricCanvas.current.centerObject(group);
        } else {
            fabricCanvas.current.add(line);
            fabricCanvas.current.centerObject(line);
        }
        fabricCanvas.current.renderAll();
    };

    const addPolygon = (sides: number = 6) => {
        if (!fabricCanvas.current) return;
        const outerRadius = 80;
        const pathPoints = [];
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            pathPoints.push({
                x: outerRadius * Math.sin(angle),
                y: -outerRadius * Math.cos(angle)
            });
        }
        const poly = new fabric.Polygon(pathPoints, {
            fill: 'white',
            left: 300,
            top: 300
        });
        fabricCanvas.current.add(poly);
        fabricCanvas.current.centerObject(poly);
    };

    const addSquircle = () => {
        if (!fabricCanvas.current) return;
        const rect = new fabric.Rect({
            width: 150,
            height: 150,
            fill: 'white',
            rx: 50,
            ry: 50,
            left: 300,
            top: 300
        });
        fabricCanvas.current.add(rect);
        fabricCanvas.current.centerObject(rect);
    };

    const changeFont = (fontFamily: string) => {
        if (!fabricCanvas.current || !selectedObject) return;
        selectedObject.set('fontFamily', fontFamily);
        fabricCanvas.current.renderAll();
        syncSelectedProps(selectedObject);
        saveState();
    };

    const changeFontSize = (delta: number) => {
        if (!fabricCanvas.current || !selectedObject) return;
        const currentSize = (selectedObject as any).fontSize || 40;
        selectedObject.set('fontSize', Math.max(1, currentSize + delta));
        fabricCanvas.current.renderAll();
        syncSelectedProps(selectedObject);
        saveState();
    };

    const toggleBold = () => {
        if (!fabricCanvas.current || !selectedObject) return;
        const isBold = (selectedObject as any).fontWeight === 'bold';
        selectedObject.set('fontWeight', isBold ? 'normal' : 'bold');
        fabricCanvas.current.renderAll();
        syncSelectedProps(selectedObject);
        saveState();
    };

    const toggleItalic = () => {
        if (!fabricCanvas.current || !selectedObject) return;
        const isItalic = (selectedObject as any).fontStyle === 'italic';
        selectedObject.set('fontStyle', isItalic ? 'normal' : 'italic');
        fabricCanvas.current.renderAll();
        syncSelectedProps(selectedObject);
        saveState();
    };

    const toggleUnderline = () => {
        if (!fabricCanvas.current || !selectedObject) return;
        const hasUnderline = (selectedObject as any).underline;
        selectedObject.set('underline', !hasUnderline);
        fabricCanvas.current.renderAll();
        syncSelectedProps(selectedObject);
        saveState();
    };

    const changeTextAlign = (align: string) => {
        if (!fabricCanvas.current || !selectedObject) return;
        selectedObject.set('textAlign', align);
        fabricCanvas.current.renderAll();
        syncSelectedProps(selectedObject);
        saveState();
    };

    const duplicateObject = async () => {
        if (!fabricCanvas.current || !selectedObject) return;
        const cloned = await selectedObject.clone();
        cloned.set({
            left: selectedObject.left! + 50,
            top: selectedObject.top! + 50
        });
        fabricCanvas.current.add(cloned);
        fabricCanvas.current.setActiveObject(cloned);
        fabricCanvas.current.renderAll();
        saveState();
    };

    const changeColor = (color: string) => {
        if (!fabricCanvas.current || !selectedObject) return;
        selectedObject.set('fill', color);

        // Also update stroke if it's a line/shape that uses stroke primarily
        if (selectedObject.type === 'line' || selectedObject.type === 'polyline') {
            selectedObject.set('stroke', color);
        }

        fabricCanvas.current.renderAll();
        syncSelectedProps(selectedObject);
        saveState();

        if (!documentColors.includes(color)) {
            setDocumentColors(prev => [color, ...prev.slice(0, 11)]);
        }
    };

    const deleteSelected = () => {
        if (!fabricCanvas.current || !selectedObject) return;
        fabricCanvas.current.remove(selectedObject);
        setSelectedObject(null);
        syncSelectedProps(null);
        saveState();
    };

    const addStar = (points: number = 5) => {
        if (!fabricCanvas.current) return;
        // Simple star implementation using polygon
        const outerRadius = 100;
        const innerRadius = 50;
        const cx = 100;
        const cy = 100;
        const pathPoints = [];
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * i) / points;
            pathPoints.push({
                x: cx + radius * Math.sin(angle),
                y: cy - radius * Math.cos(angle)
            });
        }
        const star = new fabric.Polygon(pathPoints, {
            fill: 'white',
            left: 300,
            top: 300
        });
        fabricCanvas.current.add(star);
        fabricCanvas.current.centerObject(star);
    };

    const undo = async () => {
        if (historyIndex <= 0 || isProcessingHistory || !fabricCanvas.current) return;
        setIsProcessingHistory(true);
        const prevIndex = historyIndex - 1;
        const state = history[prevIndex];
        await fabricCanvas.current.loadFromJSON(JSON.parse(state));
        fabricCanvas.current.renderAll();
        setHistoryIndex(prevIndex);
        updateLayers();
        setIsProcessingHistory(false);
    };

    const redo = async () => {
        if (historyIndex >= history.length - 1 || isProcessingHistory || !fabricCanvas.current) return;
        setIsProcessingHistory(true);
        const nextIndex = historyIndex + 1;
        const state = history[nextIndex];
        await fabricCanvas.current.loadFromJSON(JSON.parse(state));
        fabricCanvas.current.renderAll();
        setHistoryIndex(nextIndex);
        updateLayers();
        setIsProcessingHistory(false);
    };


    const downloadDesign = () => {
        if (!fabricCanvas.current) return;
        const dataURL = fabricCanvas.current.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2 // High res
        });
        const link = document.createElement('a');
        link.download = `${projectTitle}.png`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: "Design Exported", description: "Your creative strategy has been downloaded." });
    };

    const applyTemplate = async (templateId: number) => {
        const template = TEMPLATES.find(t => t.id === templateId);
        if (!template || !fabricCanvas.current) return;

        const canvas = fabricCanvas.current;
        setIsAIGenerating(true);
        setIsProcessingHistory(true);

        // Standardize dimensions
        setCanvasWidth(template.canvasWidth);
        setCanvasHeight(template.canvasHeight);

        // Wait for dimensions to propagate
        setTimeout(async () => {
            canvas.clear();
            canvas.set('backgroundColor', template.backgroundColor);

            for (const el of template.elements) {
                try {
                    let obj: fabric.Object | undefined;

                    if (el.type === 'image' && el.src) {
                        const img = await fabric.FabricImage.fromURL(el.src, { crossOrigin: 'anonymous' });
                        if (el.width) img.scaleToWidth(el.width);
                        if (el.height) img.scaleToHeight(el.height);
                        img.set({
                            opacity: el.opacity ?? 1,
                            selectable: el.selectable ?? true,
                            top: el.top ?? 0,
                            left: el.left ?? 0,
                            angle: el.angle || 0,
                            originX: el.originX as any || 'left',
                            originY: el.originY as any || 'top'
                        });
                        obj = img;
                    } else if (el.type === 'text' && el.text) {
                        const text = new fabric.IText(el.text, {
                            left: el.left,
                            top: el.top,
                            fontSize: el.fontSize,
                            fontWeight: el.fontWeight as any,
                            fill: el.fill,
                            fontFamily: el.fontFamily,
                            charSpacing: el.charSpacing,
                            lineHeight: el.lineHeight,
                            originX: el.originX as any || 'left',
                            originY: el.originY as any || 'top',
                            angle: el.angle || 0,
                            opacity: el.opacity ?? 1,
                            fontStyle: (el as any).fontStyle || 'normal'
                        });
                        obj = text;
                    } else if (el.type === 'rect') {
                        const rect = new fabric.Rect({
                            width: el.width,
                            height: el.height,
                            fill: el.fill,
                            left: el.left,
                            top: el.top,
                            rx: el.radius || 0,
                            ry: el.radius || 0,
                            stroke: el.stroke,
                            strokeWidth: el.strokeWidth,
                            selectable: el.selectable ?? true,
                            angle: el.angle || 0,
                            opacity: el.opacity ?? 1,
                            originX: el.originX as any || 'left',
                            originY: el.originY as any || 'top'
                        });
                        obj = rect;
                    } else if (el.type === 'circle') {
                        const circle = new fabric.Circle({
                            radius: el.radius,
                            fill: el.fill,
                            left: el.left,
                            top: el.top,
                            opacity: el.opacity ?? 1,
                            selectable: el.selectable ?? true,
                            angle: el.angle || 0,
                            originX: el.originX as any || 'left',
                            originY: el.originY as any || 'top'
                        });
                        obj = circle;
                    }

                    if (obj) {
                        canvas.add(obj);
                        if (el.selectable === false) {
                            obj.selectable = false;
                            obj.evented = false;
                        }
                        if (el.type === 'image' && !el.selectable) canvas.sendObjectToBack(obj);
                    }
                } catch (err) {
                    console.error("Error adding element to template:", err);
                }
            }

            setIsAIGenerating(false);
            setIsProcessingHistory(false);
            canvas.renderAll();
            updateLayers();
        }, 500);
    };

    const GOOGLE_FONTS = [
        "Inter", "Plus Jakarta Sans", "Geist", "Roboto", "Montserrat", "Playfair Display",
        "Oswald", "Poppins", "Raleway", "Lora", "Merriweather", "Noto Sans",
        "Ubuntu", "Open Sans", "Work Sans", "Quicksand", "Archivo", "Space Grotesk",
        "Crimson Text", "Alegreya", "Bebas Neue", "Fira Sans", "Kanit", "Josefin Sans",
        "Anton", "Libre Baskerville", "Titillium Web", "Bitter", "Dancing Script",
        "Pacifico", "Lobster", "Righteous", "Caveat", "Satisfy", "Courgette",
        "Abril Fatface", "Amiri", "Arvo", "Asap", "Assistant", "Barlow", "Cabin",
        "Catamaran", "Domine", "Exo 2", "Heebo", "Hind", "Inconsolata", "Josefin Slab",
        "Karla", "Mada", "Muli", "Nanum Gothic", "Nunito", "Old Standard TT", "Oxygen",
        "PT Sans", "PT Serif", "Quattrocento", "Questrial", "Rubik", "Shadows Into Light",
        "Signika", "Slabo 27px", "Source Sans Pro", "Source Serif Pro", "Staatliches",
        "Teko", "Varela Round", "Yanone Kaffeesatz", "Zilla Slab",
        "Bangers", "Cormorant", "Cinzel", "Exo", "Fjalla One", "Fredoka One", "Inknut Antiqua",
        "Karma", "Kalam", "Kaushan Script", "Lemonada", "Luckiest Guy", "Marck Script",
        "MedievalSharp", "Monoton", "Nanum Myeongjo", "Orbitron", "Passion One",
        "Patua One", "Permanent Marker", "Press Start 2P", "Rakkas", "Reenie Beanie",
        "Russo One", "Sacramento", "Special Elite", "Unbounded", "Vibes",
        "Alfa Slab One", "Amatic SC", "Architects Daughter", "Bungee",
        "Comfortaa", "Creepster", "Eater", "Faster One", "Gloria Hallelujah",
        "Great Vibes", "Handlee", "Indie Flower", "Jura", "Kelly Slab",
        "Metal Mania", "Mountains of Christmas", "Niconne", "Nosifer", "Nova Mono",
        "Pirata One", "Prosto One", "Rock Salt", "Rye",
        "Shojumaru", "Syncopate", "Yellowtail"
    ];

    const applyBackgroundPattern = async (patternUrl: string) => {
        if (!fabricCanvas.current) return;
        try {
            const img = await fabric.FabricImage.fromURL(patternUrl, {
                crossOrigin: 'anonymous'
            });

            const pattern = new fabric.Pattern({
                source: img.getElement() as HTMLImageElement,
                repeat: 'repeat'
            });

            fabricCanvas.current.set('backgroundColor', pattern);
            fabricCanvas.current.requestRenderAll();
            toast({ title: "Pattern Applied", description: "Background texture updated successfully." });
        } catch (error) {
            console.error("Pattern load error:", error);
            toast({ title: "Pattern Error", description: "Could not load the selected texture.", variant: "destructive" });
        }
    };

    const handleAIGenerate = async () => {
        if (!prompt) return;
        setIsAIGenerating(true);
        setTimeout(() => {
            addCircle();
            addText(prompt);
            toast({
                title: "Synthesis Complete",
                description: "Design generated. You can now download your creative strategy.",
                // @ts-ignore
                action: <Button variant="outline" size="sm" onClick={() => downloadDesign()}>Download</Button>
            });
            setIsAIGenerating(false);
            setPrompt("");
        }, 2000);
    };

    return (
        <div className="flex flex-col h-full bg-[#f8f9fa] overflow-hidden">
            <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />

            {/* --- Top Header (Canva Style) --- */}
            <header className="h-14 bg-white text-gray-900 flex items-center justify-between px-4 shrink-0 shadow-sm border-b border-gray-200 z-30">
                <div className="flex items-center gap-6 overflow-hidden">
                    <div className="flex items-center gap-3 pr-4 border-r border-gray-200 uppercase text-[10px] font-bold tracking-widest shrink-0">
                        <span className="hover:text-primary cursor-pointer font-bold">GROWTH<span className="text-primary">OS</span></span>
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                        <div className="flex items-center gap-1 text-primary cursor-pointer hover:bg-white/10 px-2 py-1 rounded">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-1 focus:outline-none shrink-0 whitespace-nowrap">
                                        <Zap size={12} /> Resize ({canvasWidth}x{canvasHeight})
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white border-gray-200 text-gray-900 w-64 p-3 shadow-2xl">
                                    <div className="px-2 py-2 mb-2 border-b border-gray-100">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-widest">Custom Size</p>
                                        <div className="flex gap-2 mb-3">
                                            <div className="flex-1">
                                                <label className="text-[9px] text-gray-400 block mb-1">Width</label>
                                                <Input
                                                    type="number"
                                                    value={customResizeWidth}
                                                    onChange={(e) => setCustomResizeWidth(Number(e.target.value))}
                                                    className="h-8 bg-gray-50 border-gray-200 text-xs focus:ring-primary"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-[9px] text-gray-400 block mb-1">Height</label>
                                                <Input
                                                    type="number"
                                                    value={customResizeHeight}
                                                    onChange={(e) => setCustomResizeHeight(Number(e.target.value))}
                                                    className="h-8 bg-gray-50 border-gray-200 text-xs focus:ring-primary"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => { setCanvasWidth(customResizeWidth); setCanvasHeight(customResizeHeight); }}
                                            className="w-full h-8 bg-primary text-white font-bold text-[10px] hover:bg-primary/90"
                                        >
                                            Resize Design
                                        </Button>
                                    </div>
                                    <p className="px-2 py-2 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Suggested</p>
                                    <DropdownMenuItem onClick={() => { setCanvasWidth(800); setCanvasHeight(800); }} className="hover:bg-primary/10 cursor-pointer py-2 text-xs">
                                        Insta Post (800x800)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setCanvasWidth(800); setCanvasHeight(1000); }} className="hover:bg-primary/10 cursor-pointer py-2 text-xs">
                                        Insta Portrait (800x1000)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setCanvasWidth(1080); setCanvasHeight(1350); }} className="hover:bg-primary/10 cursor-pointer py-2 text-xs">
                                        Insta Carousel (1080x1350)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setCanvasWidth(1200); setCanvasHeight(628); }} className="hover:bg-primary/10 cursor-pointer py-2 text-xs">
                                        Twitter Link (1200x628)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setCanvasWidth(1080); setCanvasHeight(1920); }} className="hover:bg-primary/10 cursor-pointer py-2 text-xs">
                                        Carousel / Story (1080x1920)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Contextual Toolbar based on selection */}
                    <AnimatePresence mode="wait">
                        {selectedObjectProps ? (
                            <motion.div
                                key="context-bar"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2 overflow-x-auto no-scrollbar"
                            >
                                {selectedObjectProps.type === 'text' && (
                                    <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-9 px-3 gap-2 hover:bg-gray-100 border border-gray-200 font-medium text-xs max-w-[150px] truncate text-gray-900">
                                                    {selectedObjectProps.fontFamily} <ChevronRight size={10} className="rotate-90 opacity-40 text-gray-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56 bg-white border-gray-200 text-gray-900 max-h-[400px] overflow-y-auto custom-scrollbar">
                                                <div className="p-2 border-b border-gray-100 sticky top-0 bg-white z-10">
                                                    <div className="relative">
                                                        <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <Input
                                                            placeholder="Search fonts..."
                                                            className="h-8 pl-8 bg-gray-50 text-[11px] border-gray-200"
                                                            value={fontSearch}
                                                            onChange={(e) => setFontSearch(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                {GOOGLE_FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).map(font => (
                                                    <DropdownMenuItem key={font} onClick={() => changeFont(font)} style={{ fontFamily: font }} className="hover:bg-primary/10 hover:text-primary cursor-pointer">
                                                        {font}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <div className="flex items-center gap-1 border-x border-gray-200 px-2 shrink-0">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 text-gray-900" onClick={() => changeFontSize(-2)}><Minus size={14} /></Button>
                                            <span className="text-xs font-bold w-12 text-center bg-gray-50 rounded mx-1 text-gray-900">{Math.round(selectedObjectProps.fontSize)}</span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 text-gray-900" onClick={() => changeFontSize(2)}><Plus size={14} /></Button>
                                        </div>

                                        <div className="flex items-center px-2 shrink-0 border-r border-gray-200">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 rounded border border-gray-200 hover:border-gray-300 overflow-hidden group relative"
                                                        title="Change Color"
                                                    >
                                                        <div
                                                            className="absolute inset-0 transition-transform group-hover:scale-110"
                                                            style={{ backgroundColor: selectedObjectProps.fill || '#000000' }}
                                                        />
                                                        <Palette size={12} className="relative z-10 text-white mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <ColorPickerPanel
                                                    currentColor={selectedObjectProps.fill || '#000000'}
                                                    onChange={changeColor}
                                                    documentColors={documentColors}
                                                    showColorPicker={showColorPicker}
                                                    setShowColorPicker={setShowColorPicker}
                                                />
                                            </Popover>
                                        </div>

                                        <div className="flex items-center gap-1 shrink-0 text-gray-900">
                                            <Button
                                                variant="ghost" size="icon"
                                                className={`h-8 w-8 hover:bg-gray-100 transition-colors ${selectedObjectProps.fontWeight === 'bold' ? 'bg-primary text-white' : ''}`}
                                                onClick={toggleBold}
                                            >
                                                <Bold size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost" size="icon"
                                                className={`h-8 w-8 hover:bg-gray-100 transition-colors ${selectedObjectProps.fontStyle === 'italic' ? 'bg-primary text-white' : ''}`}
                                                onClick={toggleItalic}
                                            >
                                                <Italic size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost" size="icon"
                                                className={`h-8 w-8 hover:bg-gray-100 transition-colors ${selectedObjectProps.underline ? 'bg-primary text-white' : ''}`}
                                                onClick={toggleUnderline}
                                            >
                                                <Underline size={16} />
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-1 border-l border-gray-200 pl-2 shrink-0">
                                            <Button
                                                variant="ghost" size="icon"
                                                className={`h-8 w-8 hover:bg-gray-100 transition-colors ${selectedObjectProps.textAlign === 'left' ? 'text-primary' : 'text-gray-900'}`}
                                                onClick={() => changeTextAlign('left')}
                                            >
                                                <AlignLeft size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost" size="icon"
                                                className={`h-8 w-8 hover:bg-gray-100 transition-colors ${selectedObjectProps.textAlign === 'center' ? 'text-primary' : 'text-gray-900'}`}
                                                onClick={() => changeTextAlign('center')}
                                            >
                                                <AlignCenter size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost" size="icon"
                                                className={`h-8 w-8 hover:bg-gray-100 transition-colors ${selectedObjectProps.textAlign === 'right' ? 'text-primary' : 'text-gray-900'}`}
                                                onClick={() => changeTextAlign('right')}
                                            >
                                                <AlignRight size={16} />
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {selectedObjectProps.type === 'image' && (
                                    <div className="flex items-center gap-1 border-l border-gray-200 pl-2 shrink-0">
                                        <Button variant="ghost" size="sm" className="h-8 gap-2 px-3 text-[11px] font-bold hover:bg-gray-100 text-gray-900">
                                            <ImageIcon size={14} className="text-primary" /> Edit image
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 gap-2 px-3 text-[11px] font-bold hover:bg-gray-100 text-gray-900">
                                            Magic BG <Crown size={10} className="text-orange-400" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 gap-2 px-3 text-[11px] font-bold hover:bg-gray-100 text-gray-900">
                                            BG Remover <Crown size={10} className="text-orange-400" />
                                        </Button>
                                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 text-gray-600" title="Eraser">
                                            <Eraser size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 text-gray-600" title="Adjust">
                                            <SlidersHorizontal size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 text-gray-600" title="Crop">
                                            <Crop size={14} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 gap-1 px-2 text-[11px] hover:bg-gray-100 text-gray-600"
                                            onClick={() => {
                                                if (fabricCanvas.current && selectedObject) {
                                                    selectedObject.set('flipX', !selectedObject.get('flipX'));
                                                    fabricCanvas.current.renderAll();
                                                    syncSelectedProps(selectedObject);
                                                    saveState();
                                                }
                                            }}
                                        >
                                            Flip <ChevronDown size={10} />
                                        </Button>
                                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 text-gray-600" title="Animate">
                                            <Zap size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 text-gray-600" title="Position">
                                            <Layers size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 text-red-500" onClick={deleteSelected} title="Delete">
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                )}

                                {selectedObjectProps.type !== 'text' && selectedObjectProps.type !== 'image' && (
                                    <div className="flex items-center gap-2 px-2 shrink-0">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 rounded border border-gray-200 hover:border-gray-300 overflow-hidden group relative"
                                                    title="Change Color"
                                                >
                                                    <div
                                                        className="absolute inset-0 transition-transform group-hover:scale-110"
                                                        style={{ backgroundColor: selectedObjectProps.fill || '#000000' }}
                                                    />
                                                    <Palette size={12} className="relative z-10 text-white mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </Button>
                                            </PopoverTrigger>
                                            <ColorPickerPanel
                                                currentColor={selectedObjectProps.fill || '#000000'}
                                                onChange={changeColor}
                                                documentColors={documentColors}
                                                showColorPicker={showColorPicker}
                                                setShowColorPicker={setShowColorPicker}
                                            />
                                        </Popover>

                                        <div className="w-px h-4 bg-gray-200 mx-1"></div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-gray-100 text-gray-600"
                                            onClick={() => {
                                                if (fabricCanvas.current && selectedObject) {
                                                    const currentStrokeWidth = selectedObject.get('strokeWidth') || 0;
                                                    selectedObject.set({
                                                        stroke: '#22ad2c',
                                                        strokeWidth: currentStrokeWidth === 0 ? 5 : currentStrokeWidth + 5
                                                    });
                                                    fabricCanvas.current.renderAll();
                                                    saveState();
                                                }
                                            }}
                                            title="Add Border"
                                        >
                                            <Square size={14} className="border-2 border-primary rounded-sm" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-gray-100 text-gray-600"
                                            onClick={() => {
                                                if (fabricCanvas.current && selectedObject) {
                                                    const radius = (selectedObject as any).rx || 0;
                                                    selectedObject.set({
                                                        rx: radius === 0 ? 30 : radius + 30,
                                                        ry: radius === 0 ? 30 : radius + 30
                                                    });
                                                    fabricCanvas.current.renderAll();
                                                    saveState();
                                                }
                                            }}
                                            title="Corner Radius"
                                        >
                                            <Monitor size={14} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-gray-100 text-gray-600"
                                            onClick={() => {
                                                if (fabricCanvas.current && selectedObject) {
                                                    const curOp = selectedObject.get('opacity') || 1;
                                                    selectedObject.set('opacity', curOp <= 0.2 ? 1 : curOp - 0.2);
                                                    fabricCanvas.current.renderAll();
                                                    syncSelectedProps(selectedObject);
                                                }
                                            }}
                                            title="Opacity"
                                        >
                                            <Blend size={14} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-gray-100 text-gray-600"
                                            onClick={() => {
                                                if (fabricCanvas.current && selectedObject) {
                                                    fabricCanvas.current.bringObjectForward(selectedObject);
                                                    fabricCanvas.current.renderAll();
                                                    updateLayers();
                                                }
                                            }}
                                            title="Move Up"
                                        >
                                            <MoveUp size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 text-red-500" onClick={deleteSelected} title="Delete">
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="default-bar"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-4 text-gray-400"
                            >
                                <button onClick={undo} disabled={historyIndex <= 0} className="disabled:opacity-20 transition-opacity">
                                    <Undo2 size={18} className="cursor-pointer hover:text-primary" />
                                </button>
                                <button onClick={redo} disabled={historyIndex >= history.length - 1} className="disabled:opacity-20 transition-opacity">
                                    <Redo2 size={18} className="cursor-pointer hover:text-primary" />
                                </button>
                                <div className="w-px h-4 bg-gray-200 mx-1"></div>
                                <div className="flex items-center gap-2 text-primary text-[10px] font-medium">
                                    <Cloud size={14} /> Saved
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex-grow flex items-center justify-center max-w-2xl px-8">
                    {!selectedObjectProps && (
                        <div className="relative w-full">
                            <Input
                                placeholder="Generate design with AI (e.g., 'Modern skincare social post')..."
                                className="bg-gray-50 border-gray-200 text-gray-900 text-sm h-9 pl-10 pr-24 focus:ring-primary focus:border-primary"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
                            />
                            <Bot className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                            <Button
                                onClick={handleAIGenerate}
                                disabled={!prompt || isAIGenerating}
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white font-bold h-7 px-3 text-[10px]"
                            >
                                {isAIGenerating ? "Generating..." : "Generate"}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4 px-4 text-gray-400">
                        <Maximize2 size={18} className="cursor-pointer hover:text-primary" />
                        <HelpCircle size={18} className="cursor-pointer hover:text-primary" />
                    </div>
                    <Button
                        onClick={downloadDesign}
                        className="bg-primary text-white hover:bg-primary/90 font-bold h-9 px-6 rounded"
                    >
                        <Download size={18} className="mr-2" /> Download
                    </Button>
                </div>
            </header>

            <div className="flex flex-grow overflow-hidden bg-[#f8f9fa] relative">
                {/* --- Left Narrow Sidebar --- */}
                <aside className="w-[72px] bg-white flex flex-col py-4 shrink-0 z-40 overflow-hidden shadow-sm border-r border-gray-200 h-full">
                    {[
                        { id: 'templates' as SidebarTab, icon: LayoutTemplate, label: 'Templates' },
                        { id: 'elements' as SidebarTab, icon: Shapes, label: 'Elements' },
                        { id: 'text' as SidebarTab, icon: Type, label: 'Text' },
                        { id: 'brand' as SidebarTab, icon: Crown, label: 'Brand', pro: true },
                        { id: 'uploads' as SidebarTab, icon: CloudUpload, label: 'Uploads' },
                        { id: 'projects' as SidebarTab, icon: FolderOpen, label: 'Projects' },
                        { id: 'magic_media' as SidebarTab, icon: Wand2, label: 'Magic Media' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center gap-1.5 py-4 transition-all relative group ${activeTab === item.id ? 'text-primary bg-primary/5' : 'text-gray-400 hover:text-primary'
                                }`}
                        >
                            <div className="relative">
                                <item.icon size={22} className={activeTab === item.id ? 'text-primary' : ''} />
                                {item.pro && (
                                    <div className="absolute -top-1 -right-1 bg-orange-400 rounded-full p-0.5 border border-white">
                                        <div className="w-1.5 h-1.5" />
                                    </div>
                                )}
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                            {activeTab === item.id && (
                                <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />
                            )}
                        </button>
                    ))}
                </aside>

                {/* --- Scrollable Content Substrate (Panels + Canvas) --- */}
                <div className="flex-grow flex overflow-x-auto overflow-y-hidden custom-scrollbar bg-[#f0f2f5] h-full">

                    {/* --- Side Panel Content --- */}
                    <div
                        key={activeTab}
                        className="w-[360px] bg-white border-r border-gray-200 flex flex-col shrink-0 z-10 shadow-sm text-gray-900 overflow-hidden h-full"
                    >
                        <div className="p-4 flex-grow overflow-y-auto custom-scrollbar h-full">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-gray-900 capitalize px-2">{activeTab.replace('_', ' ')}</h2>
                            </div>
                            {activeTab === 'elements' && !elementsCategory && (
                                <div className="space-y-6">
                                    {/* Search Bar */}
                                    <div className="relative group">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <Search size={18} className="text-gray-400" />
                                        </div>
                                        <Input
                                            placeholder="Search elements"
                                            className="pl-10 pr-16 h-12 border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-xl focus:ring-primary focus:border-primary transition-all"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <Mic size={18} className="text-gray-400 cursor-pointer hover:text-primary" />
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                                                <ChevronRight size={18} className="text-gray-900" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Pills */}
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                        {['Shape', 'Rectangle', 'Whatsapp icon', 'Circle', 'Arrow'].map((pill) => (
                                            <button
                                                key={pill}
                                                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap hover:bg-gray-100 hover:border-gray-300 transition-all font-medium"
                                            >
                                                {pill}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Generate Button */}
                                    <div className="flex items-center gap-2 p-1 bg-gray-50 border border-gray-200 rounded-xl">
                                        <button
                                            onClick={handleAIGenerate}
                                            className="flex-grow flex items-center justify-center gap-2 h-10 text-sm font-bold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors group"
                                        >
                                            <Sparkles size={16} className="text-primary group-hover:scale-110 transition-transform" />
                                            Generate images
                                        </button>
                                        <div className="w-[1px] h-6 bg-gray-200" />
                                        <button
                                            onClick={handleAIGenerate}
                                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <ChevronRight size={18} className="rotate-90" />
                                        </button>
                                    </div>

                                    {/* Recently Used */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <h3 className="text-sm font-bold text-gray-900">Recently used</h3>
                                            <button className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors">See all</button>
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                            {[1, 2, 3, 4, 5].map((item) => (
                                                <div key={item} className="w-24 shrink-0 aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] font-medium text-gray-400 group-hover:scale-110 transition-transform duration-500">
                                                        Img {item}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Browse Categories */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-900 px-1">Browse categories</h3>
                                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                                            {[
                                                { label: 'Shapes', icon: Shapes, color: 'text-cyan-600', action: () => setElementsCategory('Shapes') },
                                                { label: 'Graphics', icon: Palette, color: 'text-amber-600', action: () => addCircle() },
                                                { label: '3D', icon: Box, color: 'text-purple-600', action: () => addCircle() },
                                                { label: 'Animations', icon: Play, color: 'text-rose-600', action: () => addText("Animation Placeholder") },
                                                { label: 'Photos', icon: ImageIconComp, color: 'text-blue-600', action: () => document.getElementById('image-upload')?.click() },
                                                { label: 'Frames', icon: Square, color: 'text-emerald-600', action: () => addCircle() },
                                                { label: 'Grids', icon: LayoutGrid, color: 'text-indigo-600', action: () => addCircle() },
                                            ].map((cat) => (
                                                <button
                                                    key={cat.label}
                                                    onClick={cat.action}
                                                    className="flex flex-col items-center gap-2 group shrink-0"
                                                >
                                                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center relative shadow-sm group-hover:bg-gray-100 group-hover:border-primary/40 transition-all duration-300">
                                                        <cat.icon size={28} className={`${cat.color} group-hover:scale-110 transition-transform duration-300`} />
                                                    </div>
                                                    <span className="text-[10px] font-medium text-gray-500 group-hover:text-primary transition-colors">{cat.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'elements' && elementsCategory === 'Shapes' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2 px-1">
                                        <button onClick={() => setElementsCategory(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-all">
                                            <ArrowLeft size={18} />
                                        </button>
                                        <h2 className="text-lg font-bold text-gray-900">Shapes</h2>
                                    </div>

                                    <div className="relative group px-1">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <Search size={16} className="text-gray-400" />
                                        </div>
                                        <Input
                                            placeholder="Search shapes"
                                            className="pl-10 h-10 border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-lg focus:ring-primary focus:border-primary"
                                        />
                                    </div>

                                    <Button className="w-full bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100 h-10 font-bold rounded-lg flex gap-2 shadow-sm">
                                        <Shapes size={16} className="text-primary" /> Generate shapes
                                    </Button>

                                    {/* Lines Section */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Lines</h3>
                                            <button className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors">See all</button>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            <button onClick={() => addLine()} className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group">
                                                <div className="w-8 h-[2px] bg-gray-900 group-hover:bg-primary transition-colors" />
                                            </button>
                                            <button onClick={() => addLine([10, 5])} className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group">
                                                <div className="w-8 h-[2px] border-t-2 border-dashed border-gray-900 group-hover:border-primary transition-colors" />
                                            </button>
                                            <button onClick={() => addLine([4, 4])} className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group">
                                                <div className="w-8 h-0 border-t-2 border-dotted border-gray-900 group-hover:border-primary transition-colors" />
                                            </button>
                                            <button onClick={() => addLine(null, true)} className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group">
                                                <ArrowRight size={20} className="text-gray-900 group-hover:text-primary transition-colors" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Basic Shapes Section */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Basic shapes</h3>
                                            <button className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors">See all</button>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            <button
                                                onClick={() => addRect()}
                                                className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group"
                                                title="Rectangle"
                                            >
                                                <div className="w-8 h-8 bg-gray-900 group-hover:scale-110 group-hover:bg-primary transition-all duration-300" />
                                            </button>
                                            <button
                                                onClick={() => addRect(true)}
                                                className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group"
                                                title="Rounded Rectangle"
                                            >
                                                <div className="w-8 h-8 bg-gray-900 rounded-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-300" />
                                            </button>
                                            <button
                                                onClick={() => addSquircle()}
                                                className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group"
                                                title="Squircle"
                                            >
                                                <div className="w-8 h-8 bg-gray-900 rounded-[1.2rem] group-hover:scale-110 group-hover:bg-primary transition-all duration-300" />
                                            </button>
                                            <button
                                                onClick={() => addCircle()}
                                                className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group"
                                                title="Circle"
                                            >
                                                <div className="w-8 h-8 bg-gray-900 rounded-full group-hover:scale-110 group-hover:bg-primary transition-all duration-300" />
                                            </button>
                                            <button
                                                onClick={() => addTriangle()}
                                                className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group"
                                                title="Triangle"
                                            >
                                                <Triangle size={24} fill="currentColor" className="text-gray-900 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                                            </button>
                                            <button
                                                onClick={() => addPolygon(6)}
                                                className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group"
                                                title="Hexagon"
                                            >
                                                <Hexagon size={24} fill="currentColor" className="text-gray-900 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                                            </button>
                                            <button
                                                onClick={() => addPolygon(8)}
                                                className="aspect-square bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition-all group"
                                                title="Octagon"
                                            >
                                                <Octagon size={24} fill="currentColor" className="text-gray-900 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Stars & Polygons Section */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <h3 className="text-xs font-bold text-gray-900">Stars & Polygons</h3>
                                            <button className="text-[10px] font-bold text-gray-400 hover:text-primary uppercase tracking-wider">See all</button>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2 pb-10">
                                            <button onClick={() => addStar(4)} className="aspect-square bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center hover:border-primary transition-all group">
                                                <Star size={24} className="text-gray-900 group-hover:scale-110 group-hover:text-primary transition-transform" />
                                            </button>
                                            <button onClick={() => addStar(5)} className="aspect-square bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center hover:border-primary transition-all group">
                                                <Star size={24} className="text-gray-900 group-hover:scale-110 group-hover:text-primary transition-transform" />
                                            </button>
                                            <button onClick={() => addStar(8)} className="aspect-square bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center hover:border-primary transition-all group">
                                                <Sparkles size={24} className="text-gray-900 group-hover:scale-110 group-hover:text-primary transition-transform" />
                                            </button>
                                            <button onClick={() => addTriangle()} className="aspect-square bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center hover:border-primary transition-all group group rotate-180">
                                                <Triangle size={20} className="text-gray-900 group-hover:scale-110 group-hover:text-primary transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'brand' && (
                                <div className="space-y-6">
                                    <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 space-y-4 shadow-sm">
                                        <div className="flex items-center gap-2 text-primary font-bold">
                                            <Crown size={20} className="fill-primary/20" />
                                            <span>GROWTH BRAND KIT</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                                            Maintain consistent visual identity. Access your brand logos, colors, and fonts across all designs.
                                        </p>
                                        <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold h-11 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                                            Open Brand Settings
                                        </Button>
                                    </div>

                                    <div className="space-y-4 px-1">
                                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Brand Logos</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="aspect-square bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer group">
                                                <Plus size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center p-6 border border-gray-200">
                                                <span className="font-bold text-primary text-xs opacity-40">OS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'magic_media' && (
                                <div className="space-y-6">
                                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-gray-900 space-y-4 shadow-sm">
                                        <div className="flex items-center gap-2 text-primary">
                                            <Wand2 size={20} />
                                            <span className="font-bold">Magic Eraser & Expansion</span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Use AI to remove backgrounds, objects, or expand your canvas seamlessly.
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                onClick={handleAIGenerate}
                                                variant="outline"
                                                className="border-gray-200 bg-white hover:bg-gray-50 text-[10px] h-8 text-gray-700"
                                            >
                                                Background Remover
                                            </Button>
                                            <Button
                                                onClick={handleAIGenerate}
                                                variant="outline"
                                                className="border-gray-200 bg-white hover:bg-gray-50 text-[10px] h-8 text-gray-700"
                                            >
                                                Magic Edit
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">AI Image Bot (Gemini Sync)</h3>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                                            <div className="flex items-center gap-2 text-primary">
                                                <Bot size={18} />
                                                <span className="text-xs font-bold">Image Synthesis Engine</span>
                                            </div>
                                            <textarea
                                                placeholder="Describe the image you want Gemini to generate..."
                                                className="w-full h-24 bg-white border border-gray-200 rounded-lg p-3 text-xs text-gray-900 placeholder:text-gray-400 focus:ring-primary focus:border-primary"
                                            />
                                            <Button
                                                onClick={async () => {
                                                    setIsAIGenerating(true);
                                                    // Simulated AI Image Generation
                                                    setTimeout(async () => {
                                                        const imgUrl = `https://picsum.photos/seed/${Math.random()}/800/800`;
                                                        const img = await fabric.FabricImage.fromURL(imgUrl, { crossOrigin: 'anonymous' });
                                                        img.scaleToWidth(400);
                                                        fabricCanvas.current?.add(img);
                                                        fabricCanvas.current?.centerObject(img);
                                                        setIsAIGenerating(false);
                                                        toast({ title: "Image Generated", description: "Gemini successfully synthesized your request." });
                                                    }, 3000);
                                                }}
                                                className="w-full bg-primary text-white font-bold h-10"
                                            >
                                                Generate & Insert
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Genre</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {(Object.keys(GENRES) as DesignGenre[]).map((key) => (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        setSelectedGenre(key);
                                                        if (fabricCanvas.current) applyGenreAesthetics(fabricCanvas.current, key);
                                                    }}
                                                    className={`w-full text-left p-4 rounded-xl border transition-all ${selectedGenre === key
                                                        ? 'bg-primary/5 border-primary shadow-sm'
                                                        : 'bg-gray-50 border-gray-100 hover:border-primary/40'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-bold text-sm text-gray-900">{GENRES[key].name}</span>
                                                        {selectedGenre === key && <Badge variant="outline" className="border-primary text-primary text-[10px]">Applied</Badge>}
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 leading-tight">{GENRES[key].description}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'background' && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-gray-900">Solid Colors</h3>
                                        <div className="grid grid-cols-5 gap-2">
                                            {["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#f4f4f4", "#333333"].map(color => (
                                                <button
                                                    key={color}
                                                    className="aspect-square rounded border border-gray-200 shadow-sm"
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => {
                                                        if (fabricCanvas.current) {
                                                            fabricCanvas.current.backgroundColor = color;
                                                            fabricCanvas.current.renderAll();
                                                        }
                                                    }}
                                                />
                                            ))}
                                            <button className="aspect-square rounded border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-gray-900">Premium Patterns</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                'https://www.transparenttextures.com/patterns/carbon-fibre.png',
                                                'https://www.transparenttextures.com/patterns/dark-matter.png',
                                                'https://www.transparenttextures.com/patterns/diagmonds-light.png',
                                                'https://www.transparenttextures.com/patterns/grid-me.png',
                                                'https://www.transparenttextures.com/patterns/hexellence.png',
                                                'https://www.transparenttextures.com/patterns/pinstripe-dark.png'
                                            ].map((url, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => applyBackgroundPattern(url)}
                                                    className="aspect-video bg-gray-50 rounded border border-gray-100 hover:border-primary transition-colors cursor-pointer overflow-hidden relative group"
                                                >
                                                    <div
                                                        className="absolute inset-0 opacity-20 grayscale"
                                                        style={{ backgroundImage: `url(${url})` }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-gray-900">Creative Masks & Frames</h3>
                                        <div className="grid grid-cols-4 gap-2 pb-6">
                                            {[
                                                { name: 'Circle', icon: 'rounded-full' },
                                                { name: 'Square', icon: 'rounded-none' },
                                                { name: 'Flower', icon: 'rounded-2xl' },
                                                { name: 'Burst', icon: 'rounded-sm rotate-45' },
                                                { name: 'Wave', icon: 'rounded-xl scale-y-50' },
                                                { name: 'Organic', icon: 'rounded-[30%_70%_70%_30%/30%_30%_70%_70%]' },
                                                { name: 'Star', icon: 'rounded-full' },
                                                { name: 'Diamond', icon: 'rounded-none rotate-45' }
                                            ].map(m => (
                                                <button
                                                    key={m.name}
                                                    onClick={() => {
                                                        if (m.name === 'Circle') addCircle();
                                                        else if (m.name === 'Square') addRect();
                                                        else if (m.name === 'Organic') addSquircle();
                                                        else if (m.name === 'Diamond') addRect(false); // Can rotate it
                                                        else addStar(5);
                                                    }}
                                                    className="aspect-square bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center p-2 hover:border-primary transition-all group"
                                                >
                                                    <div className={`w-8 h-8 bg-gray-200 mb-1 group-hover:bg-primary/20 group-hover:scale-110 transition-all ${m.icon}`} />
                                                    <span className="text-[8px] uppercase text-gray-400 group-hover:text-primary">{m.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'templates' && (
                                <div className="space-y-4">
                                    <div className="relative mb-6">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <Input placeholder="Search templates..." className="pl-10 h-10 border-gray-200 bg-gray-50 text-gray-900 focus:ring-primary" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pb-8">
                                        {TEMPLATES.map((t) => (
                                            <div
                                                key={t.id}
                                                onClick={() => applyTemplate(t.id)}
                                                className="aspect-[3/4] rounded-lg bg-gray-50 border border-gray-100 transition-transform hover:scale-[1.05] cursor-pointer relative group overflow-hidden shadow-sm"
                                            >
                                                <img src={t.previewImage} alt={t.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                                                    <span className="text-[10px] font-bold text-primary">{t.tag}</span>
                                                    <span className="text-[11px] font-medium text-white truncate">{t.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'text' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 gap-4">
                                        <Button onClick={() => addText("ADD A HEADING", { fontSize: 72, fontWeight: '900' })} className="w-full h-14 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 text-xl font-black justify-start px-4 transition-all hover:scale-[1.02] shadow-sm uppercase">ADD A HEADING</Button>
                                        <Button onClick={() => addText("Add a subheading", { fontSize: 36, fontWeight: 'bold' })} className="w-full h-12 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 text-lg font-bold justify-start px-4 transition-all hover:scale-[1.02] shadow-sm">Add a subheading</Button>
                                        <Button onClick={() => addText("Add body text", { fontSize: 18, fontWeight: 'normal' })} className="w-full h-10 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 text-sm font-medium justify-start px-4 transition-all hover:scale-[1.02] shadow-sm">Add body text</Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center px-1">
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Expanded Fonts (500+)</h3>
                                            <div className="relative w-32">
                                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={10} />
                                                <Input
                                                    placeholder="Search fonts"
                                                    className="h-7 pl-6 text-[10px] bg-gray-50 border-gray-200 text-gray-900"
                                                    value={fontSearch}
                                                    onChange={(e) => setFontSearch(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                            {GOOGLE_FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).map((font, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        if (selectedObject && selectedObject.type === 'i-text') {
                                                            (selectedObject as fabric.IText).set('fontFamily', font);
                                                            fabricCanvas.current?.renderAll();
                                                        } else {
                                                            addText(`Sample in ${font}`);
                                                        }
                                                    }}
                                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary/40 text-left transition-all flex justify-between items-center group text-gray-900"
                                                >
                                                    <span style={{ fontFamily: font }} className="text-sm font-medium">{font}</span>
                                                    <span className="text-[10px] text-gray-400 group-hover:text-primary">Apply</span>
                                                </button>
                                            ))}
                                            {[...Array(20)].map((_, i) => (
                                                <div key={i + 100} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100 opacity-50 text-[10px] text-gray-400">
                                                    Additional Pro Font {i + 1}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Curated Typography</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { main: "AUTONOMOUS", sub: "Creative Engine", font: "Plus Jakarta Sans", style: "font-black" },
                                                { main: "Future Edge", sub: "Market Mastery", font: "Geist", style: "font-bold tracking-tighter" },
                                                { main: "Glass Vision", sub: "Impact Design", font: "Inter", style: "font-medium" }
                                            ].map((set, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => addText(set.main)}
                                                    className="w-full p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-primary/40 text-left transition-all hover:shadow-lg group text-gray-900"
                                                >
                                                    <div className={`text-2xl leading-none mb-1 group-hover:text-primary transition-colors ${set.style}`} style={{ fontFamily: set.font }}>{set.main}</div>
                                                    <div className="text-[10px] text-gray-400 tracking-wide uppercase">{set.sub}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Visual Text Styles</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { label: "GLOW", style: { fill: 'white', shadow: new fabric.Shadow({ color: '#22ad2c', blur: 10 }) } },
                                                { label: "NEON", style: { fill: '#22ad2c', shadow: new fabric.Shadow({ color: '#22ad2c', blur: 15 }) } },
                                                { label: "BOLD", style: { fontWeight: 'black', fill: '#1a1f26' } },
                                                { label: "ELEGANT", style: { fontFamily: 'serif', fontStyle: 'italic', fill: '#1a1f26' } },
                                            ].map((t, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        const itext = new fabric.IText(t.label, {
                                                            left: 100,
                                                            top: 100,
                                                            fontSize: 60,
                                                            ...t.style
                                                        } as any);
                                                        fabricCanvas.current?.add(itext);
                                                        fabricCanvas.current?.centerObject(itext);
                                                    }}
                                                    className={`h-20 rounded-xl flex items-center justify-center font-bold border border-gray-200 hover:border-primary/40 transition-all bg-gray-50 text-gray-900`}
                                                >
                                                    <span className="text-xs">{t.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'uploads' && (
                                <div className="space-y-6">
                                    <Button
                                        onClick={() => document.getElementById('image-upload')?.click()}
                                        className="w-full h-12 bg-primary/10 text-primary hover:bg-primary/20 border-2 border-dashed border-primary/30 font-bold"
                                    >
                                        Upload Local Assets
                                    </Button>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="aspect-square bg-gray-50 rounded border border-gray-100 flex items-center justify-center text-gray-300">
                                                <ImageIcon size={20} />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 space-y-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">AI Layout Reconstruction</h3>
                                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                                            <div className="flex items-center gap-2 text-primary">
                                                <Bot size={16} />
                                                <span className="text-[10px] font-bold">Llava-Phi3 Mode</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 leading-relaxed">
                                                Upload a reference image. Our AI will analyze the structure, text, and positions to recreate a template for you.
                                            </p>
                                            <Button
                                                onClick={() => {
                                                    setIsAIGenerating(true);
                                                    setTimeout(() => {
                                                        // Simulated Reconstruction of Zeneva.space image
                                                        fabricCanvas.current?.clear();
                                                        addText("ZENEVA.");
                                                        addText("ZENEVA\nIs Live");
                                                        addText("Visit it @ zeneva.space");
                                                        setIsAIGenerating(false);
                                                        toast({ title: "Reconstruction Complete", description: "Layout extracted from original image." });
                                                    }, 3000);
                                                }}
                                                className="w-full bg-primary text-white font-bold h-8 text-[10px]"
                                            >
                                                Analyze Reference
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'projects' && (
                                <div className="space-y-4 p-2">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/40 cursor-pointer transition-all text-gray-900">
                                        <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center text-primary font-bold">V</div>
                                        <div>
                                            <div className="text-xs font-bold font-display">Vortex Growth Strategy</div>
                                            <div className="text-[10px] text-gray-400">Edited 2 hours ago</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Main Canvas Area --- */}
                    <main className="flex-grow relative flex flex-col bg-[#f0f2f5] items-center p-12 pb-80 overflow-y-auto overflow-x-visible custom-scrollbar text-gray-900 min-w-[1000px] h-full">
                        {/* Frame/Page Toolbar (Visible when no object selected) */}
                        {!selectedObject && activePageId && (
                            <div className="sticky top-0 z-30 mb-8 flex items-center gap-4 p-2.5 bg-white border border-gray-200 rounded-xl shadow-lg backdrop-blur-lg">
                                <div className="flex items-center gap-2 px-3 border-r border-gray-100 mr-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page Style</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="w-4 h-4 rounded-sm border border-gray-200" style={{
                                                    backgroundColor: typeof fabricCanvas.current?.backgroundColor === 'string' ? fabricCanvas.current.backgroundColor : 'transparent',
                                                    backgroundImage: typeof fabricCanvas.current?.backgroundColor !== 'string' && fabricCanvas.current?.backgroundColor ? 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)' : 'none',
                                                    backgroundPosition: '0 0, 4px 4px',
                                                    backgroundSize: '8px 8px'
                                                }} />
                                                <span className="text-xs font-medium uppercase">
                                                    {typeof fabricCanvas.current?.backgroundColor === 'string' ? fabricCanvas.current.backgroundColor : 'FX / GRADIENT'}
                                                </span>
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 border-0 bg-transparent">
                                            <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-2xl">
                                                <HexColorPicker
                                                    color={typeof fabricCanvas.current?.backgroundColor === 'string' ? fabricCanvas.current.backgroundColor : '#ffffff'}
                                                    onChange={(color) => {
                                                        if (fabricCanvas.current) {
                                                            fabricCanvas.current.backgroundColor = color;
                                                            fabricCanvas.current.renderAll();
                                                            // Force re-render to update the toolbar state
                                                            setPages([...pages]);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    {/* Gradients */}
                                    <div className="flex items-center gap-1.5 ml-2">
                                        {[
                                            'linear-gradient(to right, #22ad2c, #0099ff)',
                                            'linear-gradient(to right, #f8cdda, #1d2b64)',
                                            'linear-gradient(to right, #ffafbd, #ffc3a0)',
                                            '#ffffff',
                                            '#000000'
                                        ].map((g, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    if (fabricCanvas.current) {
                                                        fabricCanvas.current.backgroundColor = g.includes('gradient') ? '#f4f4f4' : g;
                                                        fabricCanvas.current.renderAll();
                                                    }
                                                }}
                                                className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform shadow-sm"
                                                style={{ background: g }}
                                            />
                                        ))}
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="flex items-center gap-1.5 px-3 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-bold text-gray-700 transition-colors border border-gray-200">
                                                    <Droplet size={14} className="text-primary" /> Advanced FX
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-48 bg-white border-gray-200 text-gray-900 p-2">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 tracking-widest">Background FX</p>
                                                    <button onClick={() => {
                                                        if (fabricCanvas.current) {
                                                            const grad = new fabric.Gradient({
                                                                type: 'linear',
                                                                coords: { x1: 0, y1: 0, x2: canvasWidth, y2: canvasHeight },
                                                                colorStops: [
                                                                    { offset: 0, color: '#f8cdda' },
                                                                    { offset: 1, color: '#1d2b64' }
                                                                ]
                                                            });
                                                            fabricCanvas.current.set('backgroundColor', grad);
                                                            fabricCanvas.current.renderAll();
                                                        }
                                                    }} className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-xs">Linear Gradient</button>

                                                    <button onClick={() => {
                                                        if (fabricCanvas.current) {
                                                            const grad = new fabric.Gradient({
                                                                type: 'radial',
                                                                coords: { r1: 0, r2: canvasWidth, x1: canvasWidth / 2, y1: canvasHeight / 2, x2: canvasWidth / 2, y2: canvasHeight / 2 },
                                                                colorStops: [
                                                                    { offset: 0, color: '#ffafbd' },
                                                                    { offset: 1, color: '#ffc3a0' }
                                                                ]
                                                            });
                                                            fabricCanvas.current.set('backgroundColor', grad);
                                                            fabricCanvas.current.renderAll();
                                                        }
                                                    }} className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-xs">Radial Gradient</button>

                                                    <div className="w-full h-px bg-gray-100 my-1" />
                                                    <p className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 tracking-widest mt-1">Filters (Overlay)</p>

                                                    <button onClick={() => {
                                                        if (!fabricCanvas.current) return;
                                                        const canvas = fabricCanvas.current;
                                                        fabric.FabricImage.fromURL('https://grainy-gradients.vercel.app/noise.svg').then(img => {
                                                            img.set({
                                                                opacity: 0.15,
                                                                selectable: false,
                                                                scaleX: canvasWidth / (img.width || 1),
                                                                scaleY: canvasHeight / (img.height || 1),
                                                                globalCompositeOperation: 'overlay'
                                                            });
                                                            canvas.add(img);
                                                            canvas.renderAll();
                                                        });
                                                    }} className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-xs flex justify-between">Noise Grain <Crown size={10} className="text-orange-400" /></button>

                                                    <button className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-xs flex justify-between">Glassmorphism <Crown size={10} className="text-orange-400" /></button>
                                                    <button className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-xs flex justify-between">Inner Shadow <Crown size={10} className="text-orange-400" /></button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                    </div>
                                </div>
                                <div className="w-px h-6 bg-gray-100 mx-1"></div>
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold text-gray-500 hover:text-primary" onClick={() => fabricCanvas.current?.clear()}>Clear Page</Button>
                            </div>
                        )}

                        {/* Floating Toolbar */}
                        <div className="sticky top-0 z-30 mb-8 flex items-center gap-1.5 p-1 bg-white border border-gray-200 rounded-lg shadow-xl backdrop-blur-md">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-50 text-gray-900" onClick={addCircle} title="Add Shape">
                                <Component size={16} className="text-primary" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-50 text-gray-900" onClick={() => addText()} title="Add Text">
                                <Type size={16} className="text-primary" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-50 text-gray-900" onClick={() => document.getElementById('image-upload')?.click()} title="Upload Image">
                                <ImageIconComp size={16} className="text-primary" />
                            </Button>
                            <div className="w-px h-4 bg-gray-100 mx-1"></div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-red-50 text-gray-900"
                                onClick={() => {
                                    if (selectedObject) {
                                        fabricCanvas.current?.remove(selectedObject);
                                        setSelectedObject(null);
                                    }
                                }}
                                disabled={!selectedObject}
                                title="Delete Selected"
                            >
                                <Trash2 size={16} className="text-red-500" />
                            </Button>
                        </div>

                        {/* Canvas Container List */}
                        <div className="flex flex-col gap-12 items-center flex-grow pt-4">
                            {pages.map((page, index) => (
                                <div key={page.id} className="relative group transition-all duration-500 shrink-0"
                                    style={{ width: canvasWidth * (zoom / 100), height: canvasHeight * (zoom / 100) }}
                                >
                                    <div className="absolute -top-10 left-0 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between w-full px-2"
                                        style={{ width: canvasWidth * (zoom / 100) }}
                                    >
                                        <span className="flex items-center gap-2">
                                            <LayoutTemplate size={12} className="text-primary" />
                                            {page.name}
                                        </span>
                                        {pages.length > 1 && (
                                            <button
                                                onClick={() => setPages(pages.filter(p => p.id !== page.id))}
                                                className="opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-2 py-1 rounded transition-all text-[8px]"
                                            >
                                                REMOVE
                                            </button>
                                        )}
                                    </div>
                                    <div
                                        className={`absolute top-0 left-0 bg-white shadow-[0_0_120px_rgba(0,0,0,1)] ring-2 overflow-hidden rounded-sm transition-all duration-300 ${activePageId === page.id ? 'ring-primary shadow-primary/20' : 'ring-white/5 hover:ring-white/20'}`}
                                        style={{
                                            transform: `scale(${zoom / 100})`,
                                            transformOrigin: 'top left',
                                            width: canvasWidth,
                                            height: canvasHeight
                                        }}
                                        onClick={() => setActivePageId(page.id)}
                                    >
                                        <canvas id={`canvas-${page.id}`} />
                                    </div>
                                </div>
                            ))}


                            {/* Page controls below canvases */}
                            <div className="flex items-center gap-4 mt-8 mb-40 shrink-0">
                                <Button
                                    onClick={() => setPages([...pages, { id: uuidv4(), name: `Page ${pages.length + 1}` }])}
                                    className="h-12 px-8 bg-primary text-black font-black shadow-[0_0_30px_rgba(0,255,204,0.3)] hover:shadow-primary/50 rounded-full cursor-pointer transition-all hover:scale-105 active:scale-95 border-none"
                                >
                                    <Plus size={20} className="mr-2 stroke-[3px]" /> ADD NEW PAGE
                                </Button>
                            </div>
                        </div>

                        {/* Bottom Status Bar */}
                        <div className="fixed bottom-6 right-8 flex items-center gap-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-gray-200 shadow-xl z-40 text-gray-900">
                            <div className="flex items-center gap-4 text-gray-400 border-r border-gray-100 pr-6 mr-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-50"><Layers size={16} /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-50"><Bot size={16} /></Button>
                            </div>
                            <div className="flex items-center gap-4 min-w-[240px]">
                                <Minus className="text-gray-400 cursor-pointer hover:text-primary" size={14} onClick={() => setZoom(Math.max(10, zoom - 10))} />
                                <div className="flex-grow h-1.5 bg-gray-100 rounded-full relative overflow-hidden group">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-primary"
                                        animate={{ width: `${zoom}%` }}
                                    />
                                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full -top-[3px] shadow-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <Plus className="text-gray-400 cursor-pointer hover:text-primary" size={14} onClick={() => setZoom(Math.min(100, zoom + 10))} />
                                <span className="text-[11px] font-bold text-gray-900 min-w-[40px]">{zoom}%</span>
                            </div>
                            <div className="flex items-center gap-3 border-l border-gray-100 pl-6 ml-2 text-gray-400">
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-50"><Monitor size={16} /></Button>
                                <div className="flex items-center gap-1.5 px-2 hover:bg-gray-50 rounded h-8 cursor-pointer text-gray-900">
                                    <LayoutTemplate size={14} /> <span className="text-[11px] font-bold">1 / 1</span>
                                </div>
                                <Maximize2 size={16} className="cursor-pointer hover:text-primary" />
                            </div>
                        </div>

                        <div className="fixed bottom-6 left-[340px] flex items-center gap-4 text-gray-900 font-bold text-[11px] bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-xl z-40">
                            <div className="hover:text-primary cursor-pointer flex items-center gap-2"><Play size={12} /> Notes</div>
                            <div className="w-px h-3 bg-gray-100 mx-2"></div>
                            <div className="hover:text-primary cursor-pointer flex items-center gap-2"><Settings2 size={12} /> Timer</div>
                        </div>
                    </main>
                </div>
            </div>

            {/* --- AI Synthesis Overlay --- */}
            <AnimatePresence>
                {isAIGenerating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-xl"
                    >
                        <div className="flex flex-col items-center gap-8">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-32 h-32 rounded-full border-t-2 border-b-2 border-primary"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Bot size={40} className="text-primary animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold tracking-tighter text-gray-900">Synthesizing Creative Strategy</h2>
                                <p className="text-gray-400 text-sm italic">"Autonomous engine applying {GENRES[selectedGenre].name} logic..."</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Floating Object Menu --- */}
            {objectMenuPosition && selectedObjectProps && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="fixed z-[100] flex items-center gap-1 bg-white p-1 rounded-lg border border-black/10 shadow-2xl pointer-events-auto"
                    style={{
                        left: `${objectMenuPosition.x}px`,
                        top: `${objectMenuPosition.y}px`,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="flex items-center gap-0.5">
                        <Button
                            variant="ghost" size="icon" className="h-7 w-7 hover:bg-black/5"
                            onClick={duplicateObject}
                            title="Duplicate"
                        >
                            <Copy size={13} className="text-black/70" />
                        </Button>
                        <Button
                            variant="ghost" size="icon" className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                            onClick={deleteSelected}
                            title="Delete"
                        >
                            <Trash2 size={13} />
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
