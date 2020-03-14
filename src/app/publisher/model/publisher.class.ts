import Publisher from './publisher';

export default class PublisherClass implements Publisher {

    _id?: any;
    name: String;
    address?: String;
    phone?: String;

    static clone(other: Publisher) {
        let publisher = new PublisherClass();

        publisher._id = other._id;
        publisher.name = other.name;
        publisher.address = other.address;
        publisher.phone = other.phone;

        return publisher;
    }
    
}