// ----------- Parte 2 ------------

//1.	Escribir una función que recibe un arreglo de strings y retornar un arreglo con la longitud de cada string.
let arr = ["Lorem,", "ipsum", "dolor", "sit", "amet", "consectetur"];
console.log(arr.map(({ length }) => length));

//2.	Escribir una función que encuentre un número en un arreglo de números de la forma más eficiente posible. El arreglo de números de entrada puede estar desordenado.
//EN DESORDEN ->  Algoritmo: Busqueda con dos indices. (en el peor de los casos el time complexity será de O(n/2))
let arrSorted = [1, -15, 40, -5, 2, 63, 8, 11, 15];
let query = 11;
function search(arr, query) {
  let start = 0,
    end = arr.length - 1;
  while (start <= end) {
    if (arr[start] == query || arr[end] == query) return true;
    start++;
    end--;
  }
  return false;
}
console.log(search(arrSorted, query));

//EN ORDEN -> Algoritmo: Binary Search:
let arrUnsorted = [-21, -15, 0, 5, 9, 13, 18, 29, 40];
let query2 = 9;
let binarySearch = function (arr, query, start, end) {
  if (start > end) return false;
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === query) return true;
  // Busca en la izquierda por recursión
  if (arr[mid] > query) return binarySearch(arr, query, start, mid - 1);
  // Busca en la derecha por recursión
  else return binarySearch(arr, query, mid + 1, end);
};
if (binarySearch(arr, query, 0, arr.length - 1))
  console.log("Se encontró  el elemento");
else console.log("No se encontró");

//3.	Escribir una función que al ser llamada saludo(‘Hola’)(‘Mundo’) imprima el texto ‘Hola Mundo’. Ojo, la función se debe ejecutar tal cual saludo(‘Hola’)(‘Mundo’), no hay error al escribir este enunciado.
let saludo = (x) => (y) => `${x} ${y}`;
console.log(saludo("Hola")("Mundo"));

//4.	Explique qué significa en sus propias palabras: Function.prototype.bind
/*
Bind es una funcion que crea una new funcion que forzará al "this" dentro de la funcion a ser el parametro passado a bind()
Por ejemplo:
*/
var bindTest = {
  content: "bind OK",
  click() {
    console.log(this.content + " clicked");
  },
};
bindTest.click();
//Asi pasamos BIND
var boundClick = bindTest.click.bind(bindTest);
boundClick();

//5.	¿Qué es la coerción en Javascript?
/* Es la conversión implicita de valores de un tipo de dato a otro esto de acuerdo al contexto donde se use JS la realizará, 
No se debe confundir con 'conversión', dado que esta ultima se hace de forma explicita es decir el programador es quien indicará a JS que datos se van a convertir y en que.*/
const x = "2"; //string
const y = 5; //int
let mult = x * y; //En este caso JS 'coerse' 2 de string a int y puede realizar la mult.
console.log(mult); // 10
let sum = x + y; //En este caso JS 'coerse' 5 de int a string y al haber dos string los concatena
console.log("coersiòn:", sum); // 25
//Si queremos que para este último caso se realice una suma y no una concatenación debemos hacer una converseión (para evitar que JS coersa los datos):
let sumConv = Number(x) + y; //En este caso JS 'convierte' 2 de string a int y ya se puede hacer la suma
console.log("conversiòn: ", sumConv); // 7

//6.	¿Qué es una IIFE (Immediately Invoked Function Execution)? Escribe un ejemplo.
/* Es una forma de ejecutar funciones inmediatamente tan pronto como estas son creadas, 
es importante dado que ayuda a mantener un código limpio y reducir el uso de declaraciones de variables
Para ejecutarlo se envuelve el código en parentesis y luego de esto se abre y cierra otro par de parentesis (function() */
((x = "Hola, Mundo!") => console.log("IIFE: ", x))();

//7.	¿Cuál es la diferencia entre una variable que es: null, undefined o undeclared? ¿Cómo se verifica cada uno de estos estados?
//NULL = Representa la ausencia intencional de un valor en una variable (NO es 0). ejemplo: let x = null;
//Undefined = Variable que  no se le ha asignado un valor o ni siquiera se ha declaro. ejemplo: let x = ;
//Undeclared = Variable declarada pero no se ha establecido si es const, let o var. ejemplo: x = "hola, mundo";

//8.	¿Qué es Angular?
/* Angular es un framework basado en TypeScript, desarrollado y mantenido por Google para el desarrollo FRONTEND de  aplicaciones web SPA.  
Es un framework con una implementación simplista el cual cuenta con una completa documentación, posee paquetes que pueden ser agregados a cada proyecto para simplificar la implementación de funcionalidades en una forma eficiente y efectiva, 
además, al estar a cargo de Google es un framework que desde sus inicio ha estado en constante desarrollo y mejoramiento, donde con cada nuevo versionamiento se incluyen herramientas y la solución de inconvenientes, en adición a esto, 
existen herramientas y componentes de terceras partes que permiten una amplia gama de funcionalidades que se pueden agregar a los proyectos.
 */

//9.	¿Qué es un componente en Angular?
/* Es un bloque de codigo que puede ser reutilizado en distintas ocasiones en todo nuestro proyecto
Dicho codigo  se compone de un HTML, un CSS y un TS que daran la estrucutra, estilo y la fucnionalidad al componente respectivamente,
Hay un cuarto opcional que es .spec.ts que es usado para testing.
La combinación de los componentes es lo que finalmente entregará la interfaz de usuario del aplicativo.*/

//10.	¿Qué es un servicio en Angular? ¿En qué se diferencia de un Pipe?
/* Un servicio es un código reusable que estará disponible para todos los componentes de la aplicación.
Su uso mas común es el de acceso o manipulación de información, por ejemplo de la base de datos, y si bien esto podría hacerse desde el componente, sería una mala practica e iria en contra de la misión del componente el cual es únicamente presentar información al usuario.
Por lo anterior las tareas como establecer la comunicación con el backend debe hacerse a través de  servicios */

//11.	¿Qué son los Lifecycle hooks en Angular?
/* Se refiere a los ciclos de vida de los componentes que inician al crear la instancia del compoente o una directiva
Estos ciclos de vida nos permiten correr un código en un momento especifico del ciclo de vida de un compoente o directiva
Angular tiene 8 ciclos de vida, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked y OnDestroy
Por ejemplo, todos los que se encuentre dentro de OnInit de un componente "x". se ejecutará cuando se renderize el comopente "x"*/

//12.	¿Por defecto, Angular hace el render de sus aplicaciones en el frontend o en el backend? ¿Cuál es la diferencia entre hacer el render en el front o back?
/* Angluar realiza su renderizado en el front en función de acciones que se realicen desde aqui todo esto para garantizar una mejor experiencia al usuario desde que angular es un SPA
Renderizarse en el front le brinda la ventaja de poder ser una Single Page Application pero esto puede tener una desventaja dado que al no estar compilada la información desde el lado del servidor para los buscadores como Google la página no será visible 
Sin embargo tenemos una tecnologìa llamda Angular Universal que hará lo que se llama un Server Side Rendering o un renderizado desde el servidor garantizando que nuestra pagina WEB sea visible para el SEO */
