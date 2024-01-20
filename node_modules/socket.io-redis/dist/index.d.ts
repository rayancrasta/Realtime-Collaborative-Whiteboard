import { Adapter, BroadcastOptions, Room, SocketId } from "socket.io-adapter";
export interface RedisAdapterOptions {
    /**
     * the name of the key to pub/sub events on as prefix
     * @default socket.io
     */
    key: string;
    /**
     * the redis client to publish events on
     */
    pubClient: any;
    /**
     * the redis client to subscribe to events on
     */
    subClient: any;
    /**
     * after this timeout the adapter will stop waiting from responses to request
     * @default 5000
     */
    requestsTimeout: number;
}
/**
 * Returns a redis Adapter class.
 *
 * @param {String} uri - optional, redis uri
 * @param {String} opts - redis connection options
 * @return {RedisAdapter} adapter
 *
 * @public
 */
export declare function createAdapter(uri: string, opts?: Partial<RedisAdapterOptions>): any;
export declare function createAdapter(opts: Partial<RedisAdapterOptions>): any;
export declare class RedisAdapter extends Adapter {
    readonly uid: any;
    readonly pubClient: any;
    readonly subClient: any;
    readonly requestsTimeout: number;
    private readonly channel;
    private readonly requestChannel;
    private readonly responseChannel;
    private requests;
    /**
     * Adapter constructor.
     *
     * @param nsp - the namespace
     * @param uri - the url of the Redis server
     * @param opts - the options for both the Redis adapter and the Redis client
     *
     * @public
     */
    constructor(nsp: any, uri: string, opts?: Partial<RedisAdapterOptions>);
    /**
     * Called with a subscription message
     *
     * @private
     */
    private onmessage;
    /**
     * Called on request from another node
     *
     * @private
     */
    private onrequest;
    /**
     * Called on response from another node
     *
     * @private
     */
    private onresponse;
    /**
     * Broadcasts a packet.
     *
     * @param {Object} packet - packet to emit
     * @param {Object} opts - options
     *
     * @public
     */
    broadcast(packet: any, opts: BroadcastOptions): void;
    /**
     * Gets a list of sockets by sid.
     *
     * @param {Set<Room>} rooms   the explicit set of rooms to check.
     */
    sockets(rooms: Set<Room>): Promise<Set<SocketId>>;
    /**
     * Gets the list of all rooms (across every node)
     *
     * @public
     */
    allRooms(): Promise<Set<Room>>;
    /**
     * Makes the socket with the given id join the room
     *
     * @param {String} id - socket id
     * @param {String} room - room name
     * @public
     */
    remoteJoin(id: SocketId, room: Room): Promise<void>;
    /**
     * Makes the socket with the given id leave the room
     *
     * @param {String} id - socket id
     * @param {String} room - room name
     * @public
     */
    remoteLeave(id: SocketId, room: Room): Promise<void>;
    /**
     * Makes the socket with the given id to be forcefully disconnected
     * @param {String} id - socket id
     * @param {Boolean} close - if `true`, closes the underlying connection
     *
     * @public
     */
    remoteDisconnect(id: SocketId, close?: boolean): Promise<void>;
    fetchSockets(opts: BroadcastOptions): Promise<any[]>;
    addSockets(opts: BroadcastOptions, rooms: Room[]): void;
    delSockets(opts: BroadcastOptions, rooms: Room[]): void;
    disconnectSockets(opts: BroadcastOptions, close: boolean): void;
    /**
     * Get the number of subscribers of the request channel
     *
     * @private
     */
    private getNumSub;
}
