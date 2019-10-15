interface IOpenClipArt{     // returns a large data set
    payload: IPayLoad[]; // array of images

}
interface IPayLoad{
    title: string;
    svg:ISvg;
}
interface ISvg{
    url:string;
}