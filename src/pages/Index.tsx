import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  era: string;
  style: string;
  material: string;
  size: string[];
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Винтажный блейзер', price: 15000, era: '1970s', style: 'Классика', material: 'Шерсть', size: ['S', 'M', 'L'], image: '/placeholder.svg' },
  { id: 2, name: 'Архивное платье', price: 22000, era: '1960s', style: 'Коктейльный', material: 'Шёлк', size: ['XS', 'S', 'M'], image: '/placeholder.svg' },
  { id: 3, name: 'Ретро пальто', price: 28000, era: '1980s', style: 'Оверсайз', material: 'Кашемир', size: ['M', 'L', 'XL'], image: '/placeholder.svg' },
  { id: 4, name: 'Винтажные брюки', price: 12000, era: '1970s', style: 'Кэжуал', material: 'Деним', size: ['S', 'M', 'L', 'XL'], image: '/placeholder.svg' },
  { id: 5, name: 'Архивная юбка', price: 18000, era: '1960s', style: 'А-силуэт', material: 'Твид', size: ['XS', 'S', 'M'], image: '/placeholder.svg' },
  { id: 6, name: 'Ретро жакет', price: 20000, era: '1980s', style: 'Деловой', material: 'Лён', size: ['M', 'L'], image: '/placeholder.svg' },
];

export default function Index() {
  const [cart, setCart] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [selectedEras, setSelectedEras] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('all');

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const filteredProducts = products.filter(product => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const eraMatch = selectedEras.length === 0 || selectedEras.includes(product.era);
    const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(product.style);
    const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    const sizeMatch = selectedSize === 'all' || product.size.includes(selectedSize);
    
    return priceMatch && eraMatch && styleMatch && materialMatch && sizeMatch;
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const eras = ['1960s', '1970s', '1980s'];
  const styles = ['Классика', 'Коктейльный', 'Оверсайз', 'Кэжуал', 'А-силуэт', 'Деловой'];
  const materials = ['Шерсть', 'Шёлк', 'Кашемир', 'Деним', 'Твид', 'Лён'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-primary bg-background sticky top-0 z-50 vintage-texture">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-foreground tracking-wide text-3xl font-black text-left beautiful font">concepteurs médicaux</h1>
            <nav className="hidden md:flex gap-8">
              <button onClick={() => setActiveSection('home')} className="text-foreground hover:text-secondary transition-colors font-semibold">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="text-foreground hover:text-secondary transition-colors font-semibold">Каталог</button>
              <button onClick={() => setActiveSection('collections')} className="text-foreground hover:text-secondary transition-colors font-semibold">Коллекции</button>
              <button onClick={() => setActiveSection('about')} className="text-foreground hover:text-secondary transition-colors font-semibold">О проекте</button>
              <button onClick={() => setActiveSection('contacts')} className="text-foreground hover:text-secondary transition-colors font-semibold">Контакты</button>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative border-2 border-primary hover:bg-primary hover:text-primary-foreground">
                  <Icon name="ShoppingBag" className="mr-2" />
                  Корзина
                  {cart.length > 0 && (
                    <Badge className="ml-2 bg-secondary text-secondary-foreground">{cart.length}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="border-l-2 border-primary">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <Card key={index} className="border-2 border-primary">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-secondary font-bold mt-1">{item.price.toLocaleString()} ₽</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-secondary hover:text-foreground"
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="pt-4 border-t-2 border-primary">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold">Итого:</span>
                          <span className="text-xl font-bold text-secondary">{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full bg-secondary hover:bg-primary text-secondary-foreground border-2 border-primary">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <section className="vintage-texture">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center border-4 border-primary p-12 bg-card animate-fade-in">
              <h2 className="text-6xl font-bold mb-6">Дизайнерская одежда из архива</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Уникальные винтажные вещи 1960-1980х годов. <br />Каждая модель — часть истории моды.
              </p>
              <Button 
                onClick={() => setActiveSection('catalog')}
                className="bg-secondary hover:bg-primary text-secondary-foreground border-2 border-primary px-8 py-6 text-lg"
              >
                Перейти в каталог
              </Button>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'catalog' && (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="flex gap-8">
            <aside className="w-64 space-y-6 shrink-0">
              <Card className="border-2 border-primary p-6">
                <h3 className="text-lg font-bold mb-4">Фильтры</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Цена (₽)</label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={30000}
                      step={1000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{priceRange[0].toLocaleString()}</span>
                      <span>{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Размер</label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger className="border-2 border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все размеры</SelectItem>
                        {sizes.map(size => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Эпоха</label>
                    <div className="space-y-2">
                      {eras.map(era => (
                        <div key={era} className="flex items-center">
                          <Checkbox
                            id={era}
                            checked={selectedEras.includes(era)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedEras([...selectedEras, era]);
                              } else {
                                setSelectedEras(selectedEras.filter(e => e !== era));
                              }
                            }}
                          />
                          <label htmlFor={era} className="ml-2 text-sm cursor-pointer">{era}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Стиль</label>
                    <div className="space-y-2">
                      {styles.map(style => (
                        <div key={style} className="flex items-center">
                          <Checkbox
                            id={style}
                            checked={selectedStyles.includes(style)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStyles([...selectedStyles, style]);
                              } else {
                                setSelectedStyles(selectedStyles.filter(s => s !== style));
                              }
                            }}
                          />
                          <label htmlFor={style} className="ml-2 text-sm cursor-pointer">{style}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Материал</label>
                    <div className="space-y-2">
                      {materials.map(material => (
                        <div key={material} className="flex items-center">
                          <Checkbox
                            id={material}
                            checked={selectedMaterials.includes(material)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMaterials([...selectedMaterials, material]);
                              } else {
                                setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                              }
                            }}
                          />
                          <label htmlFor={material} className="ml-2 text-sm cursor-pointer">{material}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </aside>

            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-3xl font-bold">Каталог</h2>
                <p className="text-muted-foreground mt-2">Найдено товаров: {filteredProducts.length}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="border-2 border-primary hover-scale overflow-hidden">
                    <div className="aspect-[3/4] bg-muted border-b-2 border-primary">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline" className="border-primary text-xs">{product.era}</Badge>
                        <Badge variant="outline" className="border-primary text-xs">{product.style}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.material}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-secondary">{product.price.toLocaleString()} ₽</span>
                        <Button 
                          onClick={() => addToCart(product)}
                          className="bg-secondary hover:bg-primary text-secondary-foreground border-2 border-primary"
                        >
                          <Icon name="ShoppingBag" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'collections' && (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Коллекции</h2>
            <div className="grid gap-6">
              {['Классика 1960х', 'Диско эпоха 1970х', 'Оверсайз 1980х'].map((collection, index) => (
                <Card key={index} className="border-2 border-primary p-8 hover-scale">
                  <h3 className="text-2xl font-bold mb-3">{collection}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Уникальная подборка дизайнерских вещей эпохи, сохранивших свою элегантность и стиль.
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-3xl mx-auto border-4 border-primary p-12 bg-card">
            <h2 className="text-4xl font-bold mb-6">О проекте</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                АРХИВ — это проект, посвященный сохранению и популяризации дизайнерской моды прошлого. 
                Мы собираем уникальные винтажные вещи из частных коллекций и архивов модных домов.
              </p>
              <p>
                Каждая вещь в нашем каталоге — это часть истории моды, тщательно отреставрированная 
                и готовая к новой жизни в современном гардеробе.
              </p>
              <p>
                Мы верим, что настоящий стиль вне времени, и архивная мода — это не просто винтаж, 
                а инвестиция в качество и уникальность.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-2xl mx-auto border-4 border-primary p-12 bg-card">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            <div className="space-y-6 text-lg">
              <div className="flex items-start gap-4">
                <Icon name="Mail" className="text-secondary mt-1" size={24} />
                <div>
                  <div className="font-semibold mb-1">Email</div>
                  <div>info@archive-fashion.ru</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Phone" className="text-secondary mt-1" size={24} />
                <div>
                  <div className="font-semibold mb-1">Телефон</div>
                  <div>+7 (495) 123-45-67</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="MapPin" className="text-secondary mt-1" size={24} />
                <div>
                  <div className="font-semibold mb-1">Адрес</div>
                  <div>Москва, ул. Архивная, 10</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Clock" className="text-secondary mt-1" size={24} />
                <div>
                  <div className="font-semibold mb-1">Режим работы</div>
                  <div>Пн-Пт: 11:00 — 20:00<br />Сб-Вс: 12:00 — 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t-2 border-primary bg-muted text-card-foreground mt-20 vintage-texture">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">АРХИВ</h3>
            <p className="text-muted-foreground">Дизайнерская одежда из прошлого для настоящего</p>
            <div className="mt-6 flex justify-center gap-6">
              <Icon name="Instagram" className="hover:text-secondary cursor-pointer transition-colors" size={24} />
              <Icon name="Facebook" className="hover:text-secondary cursor-pointer transition-colors" size={24} />
              <Icon name="Mail" className="hover:text-secondary cursor-pointer transition-colors" size={24} />
            </div>
            <p className="mt-8 text-sm text-muted-foreground">© 2024 АРХИВ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}