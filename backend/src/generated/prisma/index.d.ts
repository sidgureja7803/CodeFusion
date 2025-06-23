
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Problem
 * 
 */
export type Problem = $Result.DefaultSelection<Prisma.$ProblemPayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>
/**
 * Model TestCaseResult
 * 
 */
export type TestCaseResult = $Result.DefaultSelection<Prisma.$TestCaseResultPayload>
/**
 * Model ProblemSolved
 * 
 */
export type ProblemSolved = $Result.DefaultSelection<Prisma.$ProblemSolvedPayload>
/**
 * Model Playlist
 * 
 */
export type Playlist = $Result.DefaultSelection<Prisma.$PlaylistPayload>
/**
 * Model ProblemPlaylist
 * 
 */
export type ProblemPlaylist = $Result.DefaultSelection<Prisma.$ProblemPlaylistPayload>
/**
 * Model Revision
 * 
 */
export type Revision = $Result.DefaultSelection<Prisma.$RevisionPayload>
/**
 * Model Discussion
 * 
 */
export type Discussion = $Result.DefaultSelection<Prisma.$DiscussionPayload>
/**
 * Model DiscussionLike
 * 
 */
export type DiscussionLike = $Result.DefaultSelection<Prisma.$DiscussionLikePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Difficulty: {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  PREFER_NOT_TO_SAY: 'PREFER_NOT_TO_SAY'
};

export type Gender = (typeof Gender)[keyof typeof Gender]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Difficulty = $Enums.Difficulty

export const Difficulty: typeof $Enums.Difficulty

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.problem`: Exposes CRUD operations for the **Problem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Problems
    * const problems = await prisma.problem.findMany()
    * ```
    */
  get problem(): Prisma.ProblemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testCaseResult`: Exposes CRUD operations for the **TestCaseResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestCaseResults
    * const testCaseResults = await prisma.testCaseResult.findMany()
    * ```
    */
  get testCaseResult(): Prisma.TestCaseResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.problemSolved`: Exposes CRUD operations for the **ProblemSolved** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProblemSolveds
    * const problemSolveds = await prisma.problemSolved.findMany()
    * ```
    */
  get problemSolved(): Prisma.ProblemSolvedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playlist`: Exposes CRUD operations for the **Playlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlists
    * const playlists = await prisma.playlist.findMany()
    * ```
    */
  get playlist(): Prisma.PlaylistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.problemPlaylist`: Exposes CRUD operations for the **ProblemPlaylist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProblemPlaylists
    * const problemPlaylists = await prisma.problemPlaylist.findMany()
    * ```
    */
  get problemPlaylist(): Prisma.ProblemPlaylistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.revision`: Exposes CRUD operations for the **Revision** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Revisions
    * const revisions = await prisma.revision.findMany()
    * ```
    */
  get revision(): Prisma.RevisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.discussion`: Exposes CRUD operations for the **Discussion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Discussions
    * const discussions = await prisma.discussion.findMany()
    * ```
    */
  get discussion(): Prisma.DiscussionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.discussionLike`: Exposes CRUD operations for the **DiscussionLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiscussionLikes
    * const discussionLikes = await prisma.discussionLike.findMany()
    * ```
    */
  get discussionLike(): Prisma.DiscussionLikeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Problem: 'Problem',
    Submission: 'Submission',
    TestCaseResult: 'TestCaseResult',
    ProblemSolved: 'ProblemSolved',
    Playlist: 'Playlist',
    ProblemPlaylist: 'ProblemPlaylist',
    Revision: 'Revision',
    Discussion: 'Discussion',
    DiscussionLike: 'DiscussionLike'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "problem" | "submission" | "testCaseResult" | "problemSolved" | "playlist" | "problemPlaylist" | "revision" | "discussion" | "discussionLike"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Problem: {
        payload: Prisma.$ProblemPayload<ExtArgs>
        fields: Prisma.ProblemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          findFirst: {
            args: Prisma.ProblemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          findMany: {
            args: Prisma.ProblemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          create: {
            args: Prisma.ProblemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          createMany: {
            args: Prisma.ProblemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          delete: {
            args: Prisma.ProblemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          update: {
            args: Prisma.ProblemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          deleteMany: {
            args: Prisma.ProblemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProblemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          upsert: {
            args: Prisma.ProblemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          aggregate: {
            args: Prisma.ProblemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblem>
          }
          groupBy: {
            args: Prisma.ProblemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
      TestCaseResult: {
        payload: Prisma.$TestCaseResultPayload<ExtArgs>
        fields: Prisma.TestCaseResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestCaseResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestCaseResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>
          }
          findFirst: {
            args: Prisma.TestCaseResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestCaseResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>
          }
          findMany: {
            args: Prisma.TestCaseResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>[]
          }
          create: {
            args: Prisma.TestCaseResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>
          }
          createMany: {
            args: Prisma.TestCaseResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestCaseResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>[]
          }
          delete: {
            args: Prisma.TestCaseResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>
          }
          update: {
            args: Prisma.TestCaseResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>
          }
          deleteMany: {
            args: Prisma.TestCaseResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestCaseResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestCaseResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>[]
          }
          upsert: {
            args: Prisma.TestCaseResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCaseResultPayload>
          }
          aggregate: {
            args: Prisma.TestCaseResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestCaseResult>
          }
          groupBy: {
            args: Prisma.TestCaseResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestCaseResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestCaseResultCountArgs<ExtArgs>
            result: $Utils.Optional<TestCaseResultCountAggregateOutputType> | number
          }
        }
      }
      ProblemSolved: {
        payload: Prisma.$ProblemSolvedPayload<ExtArgs>
        fields: Prisma.ProblemSolvedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemSolvedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemSolvedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>
          }
          findFirst: {
            args: Prisma.ProblemSolvedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemSolvedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>
          }
          findMany: {
            args: Prisma.ProblemSolvedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>[]
          }
          create: {
            args: Prisma.ProblemSolvedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>
          }
          createMany: {
            args: Prisma.ProblemSolvedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemSolvedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>[]
          }
          delete: {
            args: Prisma.ProblemSolvedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>
          }
          update: {
            args: Prisma.ProblemSolvedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>
          }
          deleteMany: {
            args: Prisma.ProblemSolvedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemSolvedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProblemSolvedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>[]
          }
          upsert: {
            args: Prisma.ProblemSolvedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSolvedPayload>
          }
          aggregate: {
            args: Prisma.ProblemSolvedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblemSolved>
          }
          groupBy: {
            args: Prisma.ProblemSolvedGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemSolvedGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemSolvedCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemSolvedCountAggregateOutputType> | number
          }
        }
      }
      Playlist: {
        payload: Prisma.$PlaylistPayload<ExtArgs>
        fields: Prisma.PlaylistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaylistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaylistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          findFirst: {
            args: Prisma.PlaylistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaylistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          findMany: {
            args: Prisma.PlaylistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          create: {
            args: Prisma.PlaylistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          createMany: {
            args: Prisma.PlaylistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaylistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          delete: {
            args: Prisma.PlaylistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          update: {
            args: Prisma.PlaylistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          deleteMany: {
            args: Prisma.PlaylistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaylistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlaylistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          upsert: {
            args: Prisma.PlaylistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          aggregate: {
            args: Prisma.PlaylistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylist>
          }
          groupBy: {
            args: Prisma.PlaylistGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaylistGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaylistCountArgs<ExtArgs>
            result: $Utils.Optional<PlaylistCountAggregateOutputType> | number
          }
        }
      }
      ProblemPlaylist: {
        payload: Prisma.$ProblemPlaylistPayload<ExtArgs>
        fields: Prisma.ProblemPlaylistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemPlaylistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemPlaylistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>
          }
          findFirst: {
            args: Prisma.ProblemPlaylistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemPlaylistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>
          }
          findMany: {
            args: Prisma.ProblemPlaylistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>[]
          }
          create: {
            args: Prisma.ProblemPlaylistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>
          }
          createMany: {
            args: Prisma.ProblemPlaylistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemPlaylistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>[]
          }
          delete: {
            args: Prisma.ProblemPlaylistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>
          }
          update: {
            args: Prisma.ProblemPlaylistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>
          }
          deleteMany: {
            args: Prisma.ProblemPlaylistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemPlaylistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProblemPlaylistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>[]
          }
          upsert: {
            args: Prisma.ProblemPlaylistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPlaylistPayload>
          }
          aggregate: {
            args: Prisma.ProblemPlaylistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblemPlaylist>
          }
          groupBy: {
            args: Prisma.ProblemPlaylistGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemPlaylistGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemPlaylistCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemPlaylistCountAggregateOutputType> | number
          }
        }
      }
      Revision: {
        payload: Prisma.$RevisionPayload<ExtArgs>
        fields: Prisma.RevisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RevisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RevisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          findFirst: {
            args: Prisma.RevisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RevisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          findMany: {
            args: Prisma.RevisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>[]
          }
          create: {
            args: Prisma.RevisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          createMany: {
            args: Prisma.RevisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RevisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>[]
          }
          delete: {
            args: Prisma.RevisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          update: {
            args: Prisma.RevisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          deleteMany: {
            args: Prisma.RevisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RevisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RevisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>[]
          }
          upsert: {
            args: Prisma.RevisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevisionPayload>
          }
          aggregate: {
            args: Prisma.RevisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRevision>
          }
          groupBy: {
            args: Prisma.RevisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RevisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RevisionCountArgs<ExtArgs>
            result: $Utils.Optional<RevisionCountAggregateOutputType> | number
          }
        }
      }
      Discussion: {
        payload: Prisma.$DiscussionPayload<ExtArgs>
        fields: Prisma.DiscussionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiscussionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiscussionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>
          }
          findFirst: {
            args: Prisma.DiscussionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiscussionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>
          }
          findMany: {
            args: Prisma.DiscussionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>[]
          }
          create: {
            args: Prisma.DiscussionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>
          }
          createMany: {
            args: Prisma.DiscussionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiscussionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>[]
          }
          delete: {
            args: Prisma.DiscussionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>
          }
          update: {
            args: Prisma.DiscussionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>
          }
          deleteMany: {
            args: Prisma.DiscussionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiscussionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DiscussionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>[]
          }
          upsert: {
            args: Prisma.DiscussionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionPayload>
          }
          aggregate: {
            args: Prisma.DiscussionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscussion>
          }
          groupBy: {
            args: Prisma.DiscussionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiscussionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiscussionCountArgs<ExtArgs>
            result: $Utils.Optional<DiscussionCountAggregateOutputType> | number
          }
        }
      }
      DiscussionLike: {
        payload: Prisma.$DiscussionLikePayload<ExtArgs>
        fields: Prisma.DiscussionLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiscussionLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiscussionLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>
          }
          findFirst: {
            args: Prisma.DiscussionLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiscussionLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>
          }
          findMany: {
            args: Prisma.DiscussionLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>[]
          }
          create: {
            args: Prisma.DiscussionLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>
          }
          createMany: {
            args: Prisma.DiscussionLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiscussionLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>[]
          }
          delete: {
            args: Prisma.DiscussionLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>
          }
          update: {
            args: Prisma.DiscussionLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>
          }
          deleteMany: {
            args: Prisma.DiscussionLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiscussionLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DiscussionLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>[]
          }
          upsert: {
            args: Prisma.DiscussionLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionLikePayload>
          }
          aggregate: {
            args: Prisma.DiscussionLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscussionLike>
          }
          groupBy: {
            args: Prisma.DiscussionLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiscussionLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiscussionLikeCountArgs<ExtArgs>
            result: $Utils.Optional<DiscussionLikeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    problem?: ProblemOmit
    submission?: SubmissionOmit
    testCaseResult?: TestCaseResultOmit
    problemSolved?: ProblemSolvedOmit
    playlist?: PlaylistOmit
    problemPlaylist?: ProblemPlaylistOmit
    revision?: RevisionOmit
    discussion?: DiscussionOmit
    discussionLike?: DiscussionLikeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    problems: number
    submissions: number
    solvedProblems: number
    Playlists: number
    discussions: number
    discussionLikes: number
    Revision: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | UserCountOutputTypeCountProblemsArgs
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
    solvedProblems?: boolean | UserCountOutputTypeCountSolvedProblemsArgs
    Playlists?: boolean | UserCountOutputTypeCountPlaylistsArgs
    discussions?: boolean | UserCountOutputTypeCountDiscussionsArgs
    discussionLikes?: boolean | UserCountOutputTypeCountDiscussionLikesArgs
    Revision?: boolean | UserCountOutputTypeCountRevisionArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProblemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSolvedProblemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemSolvedWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPlaylistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDiscussionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDiscussionLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRevisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RevisionWhereInput
  }


  /**
   * Count Type ProblemCountOutputType
   */

  export type ProblemCountOutputType = {
    submission: number
    solvedBy: number
    problemsPlaylist: number
    discussions: number
    Revision: number
  }

  export type ProblemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | ProblemCountOutputTypeCountSubmissionArgs
    solvedBy?: boolean | ProblemCountOutputTypeCountSolvedByArgs
    problemsPlaylist?: boolean | ProblemCountOutputTypeCountProblemsPlaylistArgs
    discussions?: boolean | ProblemCountOutputTypeCountDiscussionsArgs
    Revision?: boolean | ProblemCountOutputTypeCountRevisionArgs
  }

  // Custom InputTypes
  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCountOutputType
     */
    select?: ProblemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountSubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountSolvedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemSolvedWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountProblemsPlaylistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemPlaylistWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountDiscussionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionWhereInput
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountRevisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RevisionWhereInput
  }


  /**
   * Count Type SubmissionCountOutputType
   */

  export type SubmissionCountOutputType = {
    testCases: number
  }

  export type SubmissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testCases?: boolean | SubmissionCountOutputTypeCountTestCasesArgs
  }

  // Custom InputTypes
  /**
   * SubmissionCountOutputType without action
   */
  export type SubmissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionCountOutputType
     */
    select?: SubmissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubmissionCountOutputType without action
   */
  export type SubmissionCountOutputTypeCountTestCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestCaseResultWhereInput
  }


  /**
   * Count Type PlaylistCountOutputType
   */

  export type PlaylistCountOutputType = {
    problems: number
  }

  export type PlaylistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | PlaylistCountOutputTypeCountProblemsArgs
  }

  // Custom InputTypes
  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCountOutputType
     */
    select?: PlaylistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeCountProblemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemPlaylistWhereInput
  }


  /**
   * Count Type DiscussionCountOutputType
   */

  export type DiscussionCountOutputType = {
    replies: number
    likes: number
  }

  export type DiscussionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | DiscussionCountOutputTypeCountRepliesArgs
    likes?: boolean | DiscussionCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * DiscussionCountOutputType without action
   */
  export type DiscussionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionCountOutputType
     */
    select?: DiscussionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DiscussionCountOutputType without action
   */
  export type DiscussionCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionWhereInput
  }

  /**
   * DiscussionCountOutputType without action
   */
  export type DiscussionCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionLikeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    streakCount: number | null
    maxStreakCount: number | null
  }

  export type UserSumAggregateOutputType = {
    streakCount: number | null
    maxStreakCount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
    role: $Enums.Role | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
    streakCount: number | null
    maxStreakCount: number | null
    firebaseUid: string | null
    authProvider: string | null
    gender: $Enums.Gender | null
    dateOfBirth: Date | null
    bio: string | null
    githubProfile: string | null
    linkedinProfile: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
    role: $Enums.Role | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
    streakCount: number | null
    maxStreakCount: number | null
    firebaseUid: string | null
    authProvider: string | null
    gender: $Enums.Gender | null
    dateOfBirth: Date | null
    bio: string | null
    githubProfile: string | null
    linkedinProfile: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    image: number
    role: number
    password: number
    createdAt: number
    updatedAt: number
    lastLogin: number
    streakCount: number
    maxStreakCount: number
    firebaseUid: number
    authProvider: number
    gender: number
    dateOfBirth: number
    bio: number
    githubProfile: number
    linkedinProfile: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    streakCount?: true
    maxStreakCount?: true
  }

  export type UserSumAggregateInputType = {
    streakCount?: true
    maxStreakCount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    streakCount?: true
    maxStreakCount?: true
    firebaseUid?: true
    authProvider?: true
    gender?: true
    dateOfBirth?: true
    bio?: true
    githubProfile?: true
    linkedinProfile?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    streakCount?: true
    maxStreakCount?: true
    firebaseUid?: true
    authProvider?: true
    gender?: true
    dateOfBirth?: true
    bio?: true
    githubProfile?: true
    linkedinProfile?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    streakCount?: true
    maxStreakCount?: true
    firebaseUid?: true
    authProvider?: true
    gender?: true
    dateOfBirth?: true
    bio?: true
    githubProfile?: true
    linkedinProfile?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    image: string | null
    role: $Enums.Role
    password: string
    createdAt: Date
    updatedAt: Date
    lastLogin: Date | null
    streakCount: number
    maxStreakCount: number
    firebaseUid: string | null
    authProvider: string | null
    gender: $Enums.Gender | null
    dateOfBirth: Date | null
    bio: string | null
    githubProfile: string | null
    linkedinProfile: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    streakCount?: boolean
    maxStreakCount?: boolean
    firebaseUid?: boolean
    authProvider?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    bio?: boolean
    githubProfile?: boolean
    linkedinProfile?: boolean
    problems?: boolean | User$problemsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    solvedProblems?: boolean | User$solvedProblemsArgs<ExtArgs>
    Playlists?: boolean | User$PlaylistsArgs<ExtArgs>
    discussions?: boolean | User$discussionsArgs<ExtArgs>
    discussionLikes?: boolean | User$discussionLikesArgs<ExtArgs>
    Revision?: boolean | User$RevisionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    streakCount?: boolean
    maxStreakCount?: boolean
    firebaseUid?: boolean
    authProvider?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    bio?: boolean
    githubProfile?: boolean
    linkedinProfile?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    streakCount?: boolean
    maxStreakCount?: boolean
    firebaseUid?: boolean
    authProvider?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    bio?: boolean
    githubProfile?: boolean
    linkedinProfile?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    streakCount?: boolean
    maxStreakCount?: boolean
    firebaseUid?: boolean
    authProvider?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    bio?: boolean
    githubProfile?: boolean
    linkedinProfile?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "image" | "role" | "password" | "createdAt" | "updatedAt" | "lastLogin" | "streakCount" | "maxStreakCount" | "firebaseUid" | "authProvider" | "gender" | "dateOfBirth" | "bio" | "githubProfile" | "linkedinProfile", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | User$problemsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    solvedProblems?: boolean | User$solvedProblemsArgs<ExtArgs>
    Playlists?: boolean | User$PlaylistsArgs<ExtArgs>
    discussions?: boolean | User$discussionsArgs<ExtArgs>
    discussionLikes?: boolean | User$discussionLikesArgs<ExtArgs>
    Revision?: boolean | User$RevisionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      problems: Prisma.$ProblemPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
      solvedProblems: Prisma.$ProblemSolvedPayload<ExtArgs>[]
      Playlists: Prisma.$PlaylistPayload<ExtArgs>[]
      discussions: Prisma.$DiscussionPayload<ExtArgs>[]
      discussionLikes: Prisma.$DiscussionLikePayload<ExtArgs>[]
      Revision: Prisma.$RevisionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      image: string | null
      role: $Enums.Role
      password: string
      createdAt: Date
      updatedAt: Date
      lastLogin: Date | null
      streakCount: number
      maxStreakCount: number
      firebaseUid: string | null
      authProvider: string | null
      gender: $Enums.Gender | null
      dateOfBirth: Date | null
      bio: string | null
      githubProfile: string | null
      linkedinProfile: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problems<T extends User$problemsArgs<ExtArgs> = {}>(args?: Subset<T, User$problemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solvedProblems<T extends User$solvedProblemsArgs<ExtArgs> = {}>(args?: Subset<T, User$solvedProblemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Playlists<T extends User$PlaylistsArgs<ExtArgs> = {}>(args?: Subset<T, User$PlaylistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    discussions<T extends User$discussionsArgs<ExtArgs> = {}>(args?: Subset<T, User$discussionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    discussionLikes<T extends User$discussionLikesArgs<ExtArgs> = {}>(args?: Subset<T, User$discussionLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Revision<T extends User$RevisionArgs<ExtArgs> = {}>(args?: Subset<T, User$RevisionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly streakCount: FieldRef<"User", 'Int'>
    readonly maxStreakCount: FieldRef<"User", 'Int'>
    readonly firebaseUid: FieldRef<"User", 'String'>
    readonly authProvider: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'Gender'>
    readonly dateOfBirth: FieldRef<"User", 'DateTime'>
    readonly bio: FieldRef<"User", 'String'>
    readonly githubProfile: FieldRef<"User", 'String'>
    readonly linkedinProfile: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.problems
   */
  export type User$problemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    cursor?: ProblemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * User.solvedProblems
   */
  export type User$solvedProblemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    where?: ProblemSolvedWhereInput
    orderBy?: ProblemSolvedOrderByWithRelationInput | ProblemSolvedOrderByWithRelationInput[]
    cursor?: ProblemSolvedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemSolvedScalarFieldEnum | ProblemSolvedScalarFieldEnum[]
  }

  /**
   * User.Playlists
   */
  export type User$PlaylistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    where?: PlaylistWhereInput
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    cursor?: PlaylistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * User.discussions
   */
  export type User$discussionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    where?: DiscussionWhereInput
    orderBy?: DiscussionOrderByWithRelationInput | DiscussionOrderByWithRelationInput[]
    cursor?: DiscussionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscussionScalarFieldEnum | DiscussionScalarFieldEnum[]
  }

  /**
   * User.discussionLikes
   */
  export type User$discussionLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    where?: DiscussionLikeWhereInput
    orderBy?: DiscussionLikeOrderByWithRelationInput | DiscussionLikeOrderByWithRelationInput[]
    cursor?: DiscussionLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscussionLikeScalarFieldEnum | DiscussionLikeScalarFieldEnum[]
  }

  /**
   * User.Revision
   */
  export type User$RevisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    where?: RevisionWhereInput
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    cursor?: RevisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Problem
   */

  export type AggregateProblem = {
    _count: ProblemCountAggregateOutputType | null
    _avg: ProblemAvgAggregateOutputType | null
    _sum: ProblemSumAggregateOutputType | null
    _min: ProblemMinAggregateOutputType | null
    _max: ProblemMaxAggregateOutputType | null
  }

  export type ProblemAvgAggregateOutputType = {
    leetcodeId: number | null
    acceptanceRate: number | null
    frequency: number | null
    discussCount: number | null
    accepted: number | null
    submissions: number | null
    likes: number | null
    dislikes: number | null
    rating: number | null
  }

  export type ProblemSumAggregateOutputType = {
    leetcodeId: number | null
    acceptanceRate: number | null
    frequency: number | null
    discussCount: number | null
    accepted: number | null
    submissions: number | null
    likes: number | null
    dislikes: number | null
    rating: number | null
  }

  export type ProblemMinAggregateOutputType = {
    id: string | null
    leetcodeId: number | null
    title: string | null
    description: string | null
    difficulty: $Enums.Difficulty | null
    isPremium: boolean | null
    solutionLink: string | null
    acceptanceRate: number | null
    frequency: number | null
    url: string | null
    discussCount: number | null
    accepted: number | null
    submissions: number | null
    likes: number | null
    dislikes: number | null
    rating: number | null
    askedByFaang: boolean | null
    similarQuestions: string | null
    userId: string | null
    constraints: string | null
    hints: string | null
    editorial: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemMaxAggregateOutputType = {
    id: string | null
    leetcodeId: number | null
    title: string | null
    description: string | null
    difficulty: $Enums.Difficulty | null
    isPremium: boolean | null
    solutionLink: string | null
    acceptanceRate: number | null
    frequency: number | null
    url: string | null
    discussCount: number | null
    accepted: number | null
    submissions: number | null
    likes: number | null
    dislikes: number | null
    rating: number | null
    askedByFaang: boolean | null
    similarQuestions: string | null
    userId: string | null
    constraints: string | null
    hints: string | null
    editorial: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemCountAggregateOutputType = {
    id: number
    leetcodeId: number
    title: number
    description: number
    difficulty: number
    isPremium: number
    solutionLink: number
    acceptanceRate: number
    frequency: number
    url: number
    discussCount: number
    accepted: number
    submissions: number
    companies: number
    relatedTopics: number
    likes: number
    dislikes: number
    rating: number
    askedByFaang: number
    similarQuestions: number
    tags: number
    companyTags: number
    userId: number
    examples: number
    constraints: number
    hints: number
    editorial: number
    testcases: number
    codeSnippets: number
    referenceSolutions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProblemAvgAggregateInputType = {
    leetcodeId?: true
    acceptanceRate?: true
    frequency?: true
    discussCount?: true
    accepted?: true
    submissions?: true
    likes?: true
    dislikes?: true
    rating?: true
  }

  export type ProblemSumAggregateInputType = {
    leetcodeId?: true
    acceptanceRate?: true
    frequency?: true
    discussCount?: true
    accepted?: true
    submissions?: true
    likes?: true
    dislikes?: true
    rating?: true
  }

  export type ProblemMinAggregateInputType = {
    id?: true
    leetcodeId?: true
    title?: true
    description?: true
    difficulty?: true
    isPremium?: true
    solutionLink?: true
    acceptanceRate?: true
    frequency?: true
    url?: true
    discussCount?: true
    accepted?: true
    submissions?: true
    likes?: true
    dislikes?: true
    rating?: true
    askedByFaang?: true
    similarQuestions?: true
    userId?: true
    constraints?: true
    hints?: true
    editorial?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemMaxAggregateInputType = {
    id?: true
    leetcodeId?: true
    title?: true
    description?: true
    difficulty?: true
    isPremium?: true
    solutionLink?: true
    acceptanceRate?: true
    frequency?: true
    url?: true
    discussCount?: true
    accepted?: true
    submissions?: true
    likes?: true
    dislikes?: true
    rating?: true
    askedByFaang?: true
    similarQuestions?: true
    userId?: true
    constraints?: true
    hints?: true
    editorial?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemCountAggregateInputType = {
    id?: true
    leetcodeId?: true
    title?: true
    description?: true
    difficulty?: true
    isPremium?: true
    solutionLink?: true
    acceptanceRate?: true
    frequency?: true
    url?: true
    discussCount?: true
    accepted?: true
    submissions?: true
    companies?: true
    relatedTopics?: true
    likes?: true
    dislikes?: true
    rating?: true
    askedByFaang?: true
    similarQuestions?: true
    tags?: true
    companyTags?: true
    userId?: true
    examples?: true
    constraints?: true
    hints?: true
    editorial?: true
    testcases?: true
    codeSnippets?: true
    referenceSolutions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProblemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Problem to aggregate.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Problems
    **/
    _count?: true | ProblemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemMaxAggregateInputType
  }

  export type GetProblemAggregateType<T extends ProblemAggregateArgs> = {
        [P in keyof T & keyof AggregateProblem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblem[P]>
      : GetScalarType<T[P], AggregateProblem[P]>
  }




  export type ProblemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByWithAggregationInput | ProblemOrderByWithAggregationInput[]
    by: ProblemScalarFieldEnum[] | ProblemScalarFieldEnum
    having?: ProblemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemCountAggregateInputType | true
    _avg?: ProblemAvgAggregateInputType
    _sum?: ProblemSumAggregateInputType
    _min?: ProblemMinAggregateInputType
    _max?: ProblemMaxAggregateInputType
  }

  export type ProblemGroupByOutputType = {
    id: string
    leetcodeId: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium: boolean
    solutionLink: string | null
    acceptanceRate: number | null
    frequency: number | null
    url: string | null
    discussCount: number | null
    accepted: number | null
    submissions: number | null
    companies: string[]
    relatedTopics: string[]
    likes: number | null
    dislikes: number | null
    rating: number | null
    askedByFaang: boolean
    similarQuestions: string | null
    tags: string[]
    companyTags: string[]
    userId: string | null
    examples: JsonValue | null
    constraints: string | null
    hints: string | null
    editorial: string | null
    testcases: JsonValue | null
    codeSnippets: JsonValue | null
    referenceSolutions: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ProblemCountAggregateOutputType | null
    _avg: ProblemAvgAggregateOutputType | null
    _sum: ProblemSumAggregateOutputType | null
    _min: ProblemMinAggregateOutputType | null
    _max: ProblemMaxAggregateOutputType | null
  }

  type GetProblemGroupByPayload<T extends ProblemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemGroupByOutputType[P]>
        }
      >
    >


  export type ProblemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leetcodeId?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    isPremium?: boolean
    solutionLink?: boolean
    acceptanceRate?: boolean
    frequency?: boolean
    url?: boolean
    discussCount?: boolean
    accepted?: boolean
    submissions?: boolean
    companies?: boolean
    relatedTopics?: boolean
    likes?: boolean
    dislikes?: boolean
    rating?: boolean
    askedByFaang?: boolean
    similarQuestions?: boolean
    tags?: boolean
    companyTags?: boolean
    userId?: boolean
    examples?: boolean
    constraints?: boolean
    hints?: boolean
    editorial?: boolean
    testcases?: boolean
    codeSnippets?: boolean
    referenceSolutions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Problem$userArgs<ExtArgs>
    submission?: boolean | Problem$submissionArgs<ExtArgs>
    solvedBy?: boolean | Problem$solvedByArgs<ExtArgs>
    problemsPlaylist?: boolean | Problem$problemsPlaylistArgs<ExtArgs>
    discussions?: boolean | Problem$discussionsArgs<ExtArgs>
    Revision?: boolean | Problem$RevisionArgs<ExtArgs>
    _count?: boolean | ProblemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leetcodeId?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    isPremium?: boolean
    solutionLink?: boolean
    acceptanceRate?: boolean
    frequency?: boolean
    url?: boolean
    discussCount?: boolean
    accepted?: boolean
    submissions?: boolean
    companies?: boolean
    relatedTopics?: boolean
    likes?: boolean
    dislikes?: boolean
    rating?: boolean
    askedByFaang?: boolean
    similarQuestions?: boolean
    tags?: boolean
    companyTags?: boolean
    userId?: boolean
    examples?: boolean
    constraints?: boolean
    hints?: boolean
    editorial?: boolean
    testcases?: boolean
    codeSnippets?: boolean
    referenceSolutions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Problem$userArgs<ExtArgs>
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leetcodeId?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    isPremium?: boolean
    solutionLink?: boolean
    acceptanceRate?: boolean
    frequency?: boolean
    url?: boolean
    discussCount?: boolean
    accepted?: boolean
    submissions?: boolean
    companies?: boolean
    relatedTopics?: boolean
    likes?: boolean
    dislikes?: boolean
    rating?: boolean
    askedByFaang?: boolean
    similarQuestions?: boolean
    tags?: boolean
    companyTags?: boolean
    userId?: boolean
    examples?: boolean
    constraints?: boolean
    hints?: boolean
    editorial?: boolean
    testcases?: boolean
    codeSnippets?: boolean
    referenceSolutions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Problem$userArgs<ExtArgs>
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectScalar = {
    id?: boolean
    leetcodeId?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    isPremium?: boolean
    solutionLink?: boolean
    acceptanceRate?: boolean
    frequency?: boolean
    url?: boolean
    discussCount?: boolean
    accepted?: boolean
    submissions?: boolean
    companies?: boolean
    relatedTopics?: boolean
    likes?: boolean
    dislikes?: boolean
    rating?: boolean
    askedByFaang?: boolean
    similarQuestions?: boolean
    tags?: boolean
    companyTags?: boolean
    userId?: boolean
    examples?: boolean
    constraints?: boolean
    hints?: boolean
    editorial?: boolean
    testcases?: boolean
    codeSnippets?: boolean
    referenceSolutions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProblemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leetcodeId" | "title" | "description" | "difficulty" | "isPremium" | "solutionLink" | "acceptanceRate" | "frequency" | "url" | "discussCount" | "accepted" | "submissions" | "companies" | "relatedTopics" | "likes" | "dislikes" | "rating" | "askedByFaang" | "similarQuestions" | "tags" | "companyTags" | "userId" | "examples" | "constraints" | "hints" | "editorial" | "testcases" | "codeSnippets" | "referenceSolutions" | "createdAt" | "updatedAt", ExtArgs["result"]["problem"]>
  export type ProblemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Problem$userArgs<ExtArgs>
    submission?: boolean | Problem$submissionArgs<ExtArgs>
    solvedBy?: boolean | Problem$solvedByArgs<ExtArgs>
    problemsPlaylist?: boolean | Problem$problemsPlaylistArgs<ExtArgs>
    discussions?: boolean | Problem$discussionsArgs<ExtArgs>
    Revision?: boolean | Problem$RevisionArgs<ExtArgs>
    _count?: boolean | ProblemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProblemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Problem$userArgs<ExtArgs>
  }
  export type ProblemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Problem$userArgs<ExtArgs>
  }

  export type $ProblemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Problem"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      submission: Prisma.$SubmissionPayload<ExtArgs>[]
      solvedBy: Prisma.$ProblemSolvedPayload<ExtArgs>[]
      problemsPlaylist: Prisma.$ProblemPlaylistPayload<ExtArgs>[]
      discussions: Prisma.$DiscussionPayload<ExtArgs>[]
      Revision: Prisma.$RevisionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leetcodeId: number | null
      title: string
      description: string
      difficulty: $Enums.Difficulty
      isPremium: boolean
      solutionLink: string | null
      acceptanceRate: number | null
      frequency: number | null
      url: string | null
      discussCount: number | null
      accepted: number | null
      submissions: number | null
      companies: string[]
      relatedTopics: string[]
      likes: number | null
      dislikes: number | null
      rating: number | null
      askedByFaang: boolean
      similarQuestions: string | null
      tags: string[]
      companyTags: string[]
      userId: string | null
      examples: Prisma.JsonValue | null
      constraints: string | null
      hints: string | null
      editorial: string | null
      testcases: Prisma.JsonValue | null
      codeSnippets: Prisma.JsonValue | null
      referenceSolutions: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["problem"]>
    composites: {}
  }

  type ProblemGetPayload<S extends boolean | null | undefined | ProblemDefaultArgs> = $Result.GetResult<Prisma.$ProblemPayload, S>

  type ProblemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProblemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProblemCountAggregateInputType | true
    }

  export interface ProblemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Problem'], meta: { name: 'Problem' } }
    /**
     * Find zero or one Problem that matches the filter.
     * @param {ProblemFindUniqueArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemFindUniqueArgs>(args: SelectSubset<T, ProblemFindUniqueArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Problem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProblemFindUniqueOrThrowArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Problem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindFirstArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemFindFirstArgs>(args?: SelectSubset<T, ProblemFindFirstArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Problem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindFirstOrThrowArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Problems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Problems
     * const problems = await prisma.problem.findMany()
     * 
     * // Get first 10 Problems
     * const problems = await prisma.problem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemWithIdOnly = await prisma.problem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemFindManyArgs>(args?: SelectSubset<T, ProblemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Problem.
     * @param {ProblemCreateArgs} args - Arguments to create a Problem.
     * @example
     * // Create one Problem
     * const Problem = await prisma.problem.create({
     *   data: {
     *     // ... data to create a Problem
     *   }
     * })
     * 
     */
    create<T extends ProblemCreateArgs>(args: SelectSubset<T, ProblemCreateArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Problems.
     * @param {ProblemCreateManyArgs} args - Arguments to create many Problems.
     * @example
     * // Create many Problems
     * const problem = await prisma.problem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemCreateManyArgs>(args?: SelectSubset<T, ProblemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Problems and returns the data saved in the database.
     * @param {ProblemCreateManyAndReturnArgs} args - Arguments to create many Problems.
     * @example
     * // Create many Problems
     * const problem = await prisma.problem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Problems and only return the `id`
     * const problemWithIdOnly = await prisma.problem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Problem.
     * @param {ProblemDeleteArgs} args - Arguments to delete one Problem.
     * @example
     * // Delete one Problem
     * const Problem = await prisma.problem.delete({
     *   where: {
     *     // ... filter to delete one Problem
     *   }
     * })
     * 
     */
    delete<T extends ProblemDeleteArgs>(args: SelectSubset<T, ProblemDeleteArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Problem.
     * @param {ProblemUpdateArgs} args - Arguments to update one Problem.
     * @example
     * // Update one Problem
     * const problem = await prisma.problem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemUpdateArgs>(args: SelectSubset<T, ProblemUpdateArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Problems.
     * @param {ProblemDeleteManyArgs} args - Arguments to filter Problems to delete.
     * @example
     * // Delete a few Problems
     * const { count } = await prisma.problem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemDeleteManyArgs>(args?: SelectSubset<T, ProblemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Problems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Problems
     * const problem = await prisma.problem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemUpdateManyArgs>(args: SelectSubset<T, ProblemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Problems and returns the data updated in the database.
     * @param {ProblemUpdateManyAndReturnArgs} args - Arguments to update many Problems.
     * @example
     * // Update many Problems
     * const problem = await prisma.problem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Problems and only return the `id`
     * const problemWithIdOnly = await prisma.problem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProblemUpdateManyAndReturnArgs>(args: SelectSubset<T, ProblemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Problem.
     * @param {ProblemUpsertArgs} args - Arguments to update or create a Problem.
     * @example
     * // Update or create a Problem
     * const problem = await prisma.problem.upsert({
     *   create: {
     *     // ... data to create a Problem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Problem we want to update
     *   }
     * })
     */
    upsert<T extends ProblemUpsertArgs>(args: SelectSubset<T, ProblemUpsertArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Problems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCountArgs} args - Arguments to filter Problems to count.
     * @example
     * // Count the number of Problems
     * const count = await prisma.problem.count({
     *   where: {
     *     // ... the filter for the Problems we want to count
     *   }
     * })
    **/
    count<T extends ProblemCountArgs>(
      args?: Subset<T, ProblemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Problem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemAggregateArgs>(args: Subset<T, ProblemAggregateArgs>): Prisma.PrismaPromise<GetProblemAggregateType<T>>

    /**
     * Group by Problem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemGroupByArgs['orderBy'] }
        : { orderBy?: ProblemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Problem model
   */
  readonly fields: ProblemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Problem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Problem$userArgs<ExtArgs> = {}>(args?: Subset<T, Problem$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    submission<T extends Problem$submissionArgs<ExtArgs> = {}>(args?: Subset<T, Problem$submissionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solvedBy<T extends Problem$solvedByArgs<ExtArgs> = {}>(args?: Subset<T, Problem$solvedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    problemsPlaylist<T extends Problem$problemsPlaylistArgs<ExtArgs> = {}>(args?: Subset<T, Problem$problemsPlaylistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    discussions<T extends Problem$discussionsArgs<ExtArgs> = {}>(args?: Subset<T, Problem$discussionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Revision<T extends Problem$RevisionArgs<ExtArgs> = {}>(args?: Subset<T, Problem$RevisionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Problem model
   */
  interface ProblemFieldRefs {
    readonly id: FieldRef<"Problem", 'String'>
    readonly leetcodeId: FieldRef<"Problem", 'Int'>
    readonly title: FieldRef<"Problem", 'String'>
    readonly description: FieldRef<"Problem", 'String'>
    readonly difficulty: FieldRef<"Problem", 'Difficulty'>
    readonly isPremium: FieldRef<"Problem", 'Boolean'>
    readonly solutionLink: FieldRef<"Problem", 'String'>
    readonly acceptanceRate: FieldRef<"Problem", 'Float'>
    readonly frequency: FieldRef<"Problem", 'Float'>
    readonly url: FieldRef<"Problem", 'String'>
    readonly discussCount: FieldRef<"Problem", 'Int'>
    readonly accepted: FieldRef<"Problem", 'Int'>
    readonly submissions: FieldRef<"Problem", 'Int'>
    readonly companies: FieldRef<"Problem", 'String[]'>
    readonly relatedTopics: FieldRef<"Problem", 'String[]'>
    readonly likes: FieldRef<"Problem", 'Int'>
    readonly dislikes: FieldRef<"Problem", 'Int'>
    readonly rating: FieldRef<"Problem", 'Float'>
    readonly askedByFaang: FieldRef<"Problem", 'Boolean'>
    readonly similarQuestions: FieldRef<"Problem", 'String'>
    readonly tags: FieldRef<"Problem", 'String[]'>
    readonly companyTags: FieldRef<"Problem", 'String[]'>
    readonly userId: FieldRef<"Problem", 'String'>
    readonly examples: FieldRef<"Problem", 'Json'>
    readonly constraints: FieldRef<"Problem", 'String'>
    readonly hints: FieldRef<"Problem", 'String'>
    readonly editorial: FieldRef<"Problem", 'String'>
    readonly testcases: FieldRef<"Problem", 'Json'>
    readonly codeSnippets: FieldRef<"Problem", 'Json'>
    readonly referenceSolutions: FieldRef<"Problem", 'Json'>
    readonly createdAt: FieldRef<"Problem", 'DateTime'>
    readonly updatedAt: FieldRef<"Problem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Problem findUnique
   */
  export type ProblemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem findUniqueOrThrow
   */
  export type ProblemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem findFirst
   */
  export type ProblemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Problems.
     */
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem findFirstOrThrow
   */
  export type ProblemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Problems.
     */
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem findMany
   */
  export type ProblemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problems to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem create
   */
  export type ProblemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The data needed to create a Problem.
     */
    data: XOR<ProblemCreateInput, ProblemUncheckedCreateInput>
  }

  /**
   * Problem createMany
   */
  export type ProblemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Problems.
     */
    data: ProblemCreateManyInput | ProblemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Problem createManyAndReturn
   */
  export type ProblemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * The data used to create many Problems.
     */
    data: ProblemCreateManyInput | ProblemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Problem update
   */
  export type ProblemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The data needed to update a Problem.
     */
    data: XOR<ProblemUpdateInput, ProblemUncheckedUpdateInput>
    /**
     * Choose, which Problem to update.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem updateMany
   */
  export type ProblemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Problems.
     */
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyInput>
    /**
     * Filter which Problems to update
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to update.
     */
    limit?: number
  }

  /**
   * Problem updateManyAndReturn
   */
  export type ProblemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * The data used to update Problems.
     */
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyInput>
    /**
     * Filter which Problems to update
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Problem upsert
   */
  export type ProblemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The filter to search for the Problem to update in case it exists.
     */
    where: ProblemWhereUniqueInput
    /**
     * In case the Problem found by the `where` argument doesn't exist, create a new Problem with this data.
     */
    create: XOR<ProblemCreateInput, ProblemUncheckedCreateInput>
    /**
     * In case the Problem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemUpdateInput, ProblemUncheckedUpdateInput>
  }

  /**
   * Problem delete
   */
  export type ProblemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter which Problem to delete.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem deleteMany
   */
  export type ProblemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Problems to delete
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to delete.
     */
    limit?: number
  }

  /**
   * Problem.user
   */
  export type Problem$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Problem.submission
   */
  export type Problem$submissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Problem.solvedBy
   */
  export type Problem$solvedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    where?: ProblemSolvedWhereInput
    orderBy?: ProblemSolvedOrderByWithRelationInput | ProblemSolvedOrderByWithRelationInput[]
    cursor?: ProblemSolvedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemSolvedScalarFieldEnum | ProblemSolvedScalarFieldEnum[]
  }

  /**
   * Problem.problemsPlaylist
   */
  export type Problem$problemsPlaylistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    where?: ProblemPlaylistWhereInput
    orderBy?: ProblemPlaylistOrderByWithRelationInput | ProblemPlaylistOrderByWithRelationInput[]
    cursor?: ProblemPlaylistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemPlaylistScalarFieldEnum | ProblemPlaylistScalarFieldEnum[]
  }

  /**
   * Problem.discussions
   */
  export type Problem$discussionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    where?: DiscussionWhereInput
    orderBy?: DiscussionOrderByWithRelationInput | DiscussionOrderByWithRelationInput[]
    cursor?: DiscussionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscussionScalarFieldEnum | DiscussionScalarFieldEnum[]
  }

  /**
   * Problem.Revision
   */
  export type Problem$RevisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    where?: RevisionWhereInput
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    cursor?: RevisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * Problem without action
   */
  export type ProblemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    problemId: string | null
    userId: string | null
    language: string | null
    stdin: string | null
    stdout: string | null
    stderr: string | null
    compileOutput: string | null
    status: string | null
    memory: string | null
    time: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    problemId: string | null
    userId: string | null
    language: string | null
    stdin: string | null
    stdout: string | null
    stderr: string | null
    compileOutput: string | null
    status: string | null
    memory: string | null
    time: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    problemId: number
    userId: number
    sourceCode: number
    language: number
    stdin: number
    stdout: number
    stderr: number
    compileOutput: number
    status: number
    memory: number
    time: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubmissionMinAggregateInputType = {
    id?: true
    problemId?: true
    userId?: true
    language?: true
    stdin?: true
    stdout?: true
    stderr?: true
    compileOutput?: true
    status?: true
    memory?: true
    time?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    problemId?: true
    userId?: true
    language?: true
    stdin?: true
    stdout?: true
    stderr?: true
    compileOutput?: true
    status?: true
    memory?: true
    time?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    problemId?: true
    userId?: true
    sourceCode?: true
    language?: true
    stdin?: true
    stdout?: true
    stderr?: true
    compileOutput?: true
    status?: true
    memory?: true
    time?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: string
    problemId: string
    userId: string
    sourceCode: JsonValue
    language: string
    stdin: string | null
    stdout: string | null
    stderr: string | null
    compileOutput: string | null
    status: string
    memory: string | null
    time: string | null
    createdAt: Date
    updatedAt: Date
    _count: SubmissionCountAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    userId?: boolean
    sourceCode?: boolean
    language?: boolean
    stdin?: boolean
    stdout?: boolean
    stderr?: boolean
    compileOutput?: boolean
    status?: boolean
    memory?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    testCases?: boolean | Submission$testCasesArgs<ExtArgs>
    _count?: boolean | SubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    userId?: boolean
    sourceCode?: boolean
    language?: boolean
    stdin?: boolean
    stdout?: boolean
    stderr?: boolean
    compileOutput?: boolean
    status?: boolean
    memory?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    userId?: boolean
    sourceCode?: boolean
    language?: boolean
    stdin?: boolean
    stdout?: boolean
    stderr?: boolean
    compileOutput?: boolean
    status?: boolean
    memory?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    problemId?: boolean
    userId?: boolean
    sourceCode?: boolean
    language?: boolean
    stdin?: boolean
    stdout?: boolean
    stderr?: boolean
    compileOutput?: boolean
    status?: boolean
    memory?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "problemId" | "userId" | "sourceCode" | "language" | "stdin" | "stdout" | "stderr" | "compileOutput" | "status" | "memory" | "time" | "createdAt" | "updatedAt", ExtArgs["result"]["submission"]>
  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    testCases?: boolean | Submission$testCasesArgs<ExtArgs>
    _count?: boolean | SubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      testCases: Prisma.$TestCaseResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      problemId: string
      userId: string
      sourceCode: Prisma.JsonValue
      language: string
      stdin: string | null
      stdout: string | null
      stderr: string | null
      compileOutput: string | null
      status: string
      memory: string | null
      time: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions and returns the data updated in the database.
     * @param {SubmissionUpdateManyAndReturnArgs} args - Arguments to update many Submissions.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    testCases<T extends Submission$testCasesArgs<ExtArgs> = {}>(args?: Subset<T, Submission$testCasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Submission model
   */
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'String'>
    readonly problemId: FieldRef<"Submission", 'String'>
    readonly userId: FieldRef<"Submission", 'String'>
    readonly sourceCode: FieldRef<"Submission", 'Json'>
    readonly language: FieldRef<"Submission", 'String'>
    readonly stdin: FieldRef<"Submission", 'String'>
    readonly stdout: FieldRef<"Submission", 'String'>
    readonly stderr: FieldRef<"Submission", 'String'>
    readonly compileOutput: FieldRef<"Submission", 'String'>
    readonly status: FieldRef<"Submission", 'String'>
    readonly memory: FieldRef<"Submission", 'String'>
    readonly time: FieldRef<"Submission", 'String'>
    readonly createdAt: FieldRef<"Submission", 'DateTime'>
    readonly updatedAt: FieldRef<"Submission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
  }

  /**
   * Submission updateManyAndReturn
   */
  export type SubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to delete.
     */
    limit?: number
  }

  /**
   * Submission.testCases
   */
  export type Submission$testCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    where?: TestCaseResultWhereInput
    orderBy?: TestCaseResultOrderByWithRelationInput | TestCaseResultOrderByWithRelationInput[]
    cursor?: TestCaseResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestCaseResultScalarFieldEnum | TestCaseResultScalarFieldEnum[]
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Model TestCaseResult
   */

  export type AggregateTestCaseResult = {
    _count: TestCaseResultCountAggregateOutputType | null
    _avg: TestCaseResultAvgAggregateOutputType | null
    _sum: TestCaseResultSumAggregateOutputType | null
    _min: TestCaseResultMinAggregateOutputType | null
    _max: TestCaseResultMaxAggregateOutputType | null
  }

  export type TestCaseResultAvgAggregateOutputType = {
    testCase: number | null
  }

  export type TestCaseResultSumAggregateOutputType = {
    testCase: number | null
  }

  export type TestCaseResultMinAggregateOutputType = {
    id: string | null
    submissionId: string | null
    testCase: number | null
    passed: boolean | null
    stdout: string | null
    expected: string | null
    stderr: string | null
    compileOutput: string | null
    status: string | null
    memory: string | null
    time: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestCaseResultMaxAggregateOutputType = {
    id: string | null
    submissionId: string | null
    testCase: number | null
    passed: boolean | null
    stdout: string | null
    expected: string | null
    stderr: string | null
    compileOutput: string | null
    status: string | null
    memory: string | null
    time: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestCaseResultCountAggregateOutputType = {
    id: number
    submissionId: number
    testCase: number
    passed: number
    stdout: number
    expected: number
    stderr: number
    compileOutput: number
    status: number
    memory: number
    time: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TestCaseResultAvgAggregateInputType = {
    testCase?: true
  }

  export type TestCaseResultSumAggregateInputType = {
    testCase?: true
  }

  export type TestCaseResultMinAggregateInputType = {
    id?: true
    submissionId?: true
    testCase?: true
    passed?: true
    stdout?: true
    expected?: true
    stderr?: true
    compileOutput?: true
    status?: true
    memory?: true
    time?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestCaseResultMaxAggregateInputType = {
    id?: true
    submissionId?: true
    testCase?: true
    passed?: true
    stdout?: true
    expected?: true
    stderr?: true
    compileOutput?: true
    status?: true
    memory?: true
    time?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestCaseResultCountAggregateInputType = {
    id?: true
    submissionId?: true
    testCase?: true
    passed?: true
    stdout?: true
    expected?: true
    stderr?: true
    compileOutput?: true
    status?: true
    memory?: true
    time?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TestCaseResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestCaseResult to aggregate.
     */
    where?: TestCaseResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCaseResults to fetch.
     */
    orderBy?: TestCaseResultOrderByWithRelationInput | TestCaseResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestCaseResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCaseResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCaseResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestCaseResults
    **/
    _count?: true | TestCaseResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestCaseResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestCaseResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestCaseResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestCaseResultMaxAggregateInputType
  }

  export type GetTestCaseResultAggregateType<T extends TestCaseResultAggregateArgs> = {
        [P in keyof T & keyof AggregateTestCaseResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestCaseResult[P]>
      : GetScalarType<T[P], AggregateTestCaseResult[P]>
  }




  export type TestCaseResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestCaseResultWhereInput
    orderBy?: TestCaseResultOrderByWithAggregationInput | TestCaseResultOrderByWithAggregationInput[]
    by: TestCaseResultScalarFieldEnum[] | TestCaseResultScalarFieldEnum
    having?: TestCaseResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCaseResultCountAggregateInputType | true
    _avg?: TestCaseResultAvgAggregateInputType
    _sum?: TestCaseResultSumAggregateInputType
    _min?: TestCaseResultMinAggregateInputType
    _max?: TestCaseResultMaxAggregateInputType
  }

  export type TestCaseResultGroupByOutputType = {
    id: string
    submissionId: string
    testCase: number
    passed: boolean
    stdout: string | null
    expected: string | null
    stderr: string | null
    compileOutput: string | null
    status: string
    memory: string | null
    time: string | null
    createdAt: Date
    updatedAt: Date
    _count: TestCaseResultCountAggregateOutputType | null
    _avg: TestCaseResultAvgAggregateOutputType | null
    _sum: TestCaseResultSumAggregateOutputType | null
    _min: TestCaseResultMinAggregateOutputType | null
    _max: TestCaseResultMaxAggregateOutputType | null
  }

  type GetTestCaseResultGroupByPayload<T extends TestCaseResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestCaseResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestCaseResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestCaseResultGroupByOutputType[P]>
            : GetScalarType<T[P], TestCaseResultGroupByOutputType[P]>
        }
      >
    >


  export type TestCaseResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    testCase?: boolean
    passed?: boolean
    stdout?: boolean
    expected?: boolean
    stderr?: boolean
    compileOutput?: boolean
    status?: boolean
    memory?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testCaseResult"]>

  export type TestCaseResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    testCase?: boolean
    passed?: boolean
    stdout?: boolean
    expected?: boolean
    stderr?: boolean
    compileOutput?: boolean
    status?: boolean
    memory?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testCaseResult"]>

  export type TestCaseResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    testCase?: boolean
    passed?: boolean
    stdout?: boolean
    expected?: boolean
    stderr?: boolean
    compileOutput?: boolean
    status?: boolean
    memory?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testCaseResult"]>

  export type TestCaseResultSelectScalar = {
    id?: boolean
    submissionId?: boolean
    testCase?: boolean
    passed?: boolean
    stdout?: boolean
    expected?: boolean
    stderr?: boolean
    compileOutput?: boolean
    status?: boolean
    memory?: boolean
    time?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TestCaseResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "submissionId" | "testCase" | "passed" | "stdout" | "expected" | "stderr" | "compileOutput" | "status" | "memory" | "time" | "createdAt" | "updatedAt", ExtArgs["result"]["testCaseResult"]>
  export type TestCaseResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }
  export type TestCaseResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }
  export type TestCaseResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
  }

  export type $TestCaseResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestCaseResult"
    objects: {
      submission: Prisma.$SubmissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      submissionId: string
      testCase: number
      passed: boolean
      stdout: string | null
      expected: string | null
      stderr: string | null
      compileOutput: string | null
      status: string
      memory: string | null
      time: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["testCaseResult"]>
    composites: {}
  }

  type TestCaseResultGetPayload<S extends boolean | null | undefined | TestCaseResultDefaultArgs> = $Result.GetResult<Prisma.$TestCaseResultPayload, S>

  type TestCaseResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestCaseResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestCaseResultCountAggregateInputType | true
    }

  export interface TestCaseResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestCaseResult'], meta: { name: 'TestCaseResult' } }
    /**
     * Find zero or one TestCaseResult that matches the filter.
     * @param {TestCaseResultFindUniqueArgs} args - Arguments to find a TestCaseResult
     * @example
     * // Get one TestCaseResult
     * const testCaseResult = await prisma.testCaseResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestCaseResultFindUniqueArgs>(args: SelectSubset<T, TestCaseResultFindUniqueArgs<ExtArgs>>): Prisma__TestCaseResultClient<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestCaseResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestCaseResultFindUniqueOrThrowArgs} args - Arguments to find a TestCaseResult
     * @example
     * // Get one TestCaseResult
     * const testCaseResult = await prisma.testCaseResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestCaseResultFindUniqueOrThrowArgs>(args: SelectSubset<T, TestCaseResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestCaseResultClient<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestCaseResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseResultFindFirstArgs} args - Arguments to find a TestCaseResult
     * @example
     * // Get one TestCaseResult
     * const testCaseResult = await prisma.testCaseResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestCaseResultFindFirstArgs>(args?: SelectSubset<T, TestCaseResultFindFirstArgs<ExtArgs>>): Prisma__TestCaseResultClient<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestCaseResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseResultFindFirstOrThrowArgs} args - Arguments to find a TestCaseResult
     * @example
     * // Get one TestCaseResult
     * const testCaseResult = await prisma.testCaseResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestCaseResultFindFirstOrThrowArgs>(args?: SelectSubset<T, TestCaseResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestCaseResultClient<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestCaseResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestCaseResults
     * const testCaseResults = await prisma.testCaseResult.findMany()
     * 
     * // Get first 10 TestCaseResults
     * const testCaseResults = await prisma.testCaseResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testCaseResultWithIdOnly = await prisma.testCaseResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestCaseResultFindManyArgs>(args?: SelectSubset<T, TestCaseResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestCaseResult.
     * @param {TestCaseResultCreateArgs} args - Arguments to create a TestCaseResult.
     * @example
     * // Create one TestCaseResult
     * const TestCaseResult = await prisma.testCaseResult.create({
     *   data: {
     *     // ... data to create a TestCaseResult
     *   }
     * })
     * 
     */
    create<T extends TestCaseResultCreateArgs>(args: SelectSubset<T, TestCaseResultCreateArgs<ExtArgs>>): Prisma__TestCaseResultClient<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestCaseResults.
     * @param {TestCaseResultCreateManyArgs} args - Arguments to create many TestCaseResults.
     * @example
     * // Create many TestCaseResults
     * const testCaseResult = await prisma.testCaseResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestCaseResultCreateManyArgs>(args?: SelectSubset<T, TestCaseResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestCaseResults and returns the data saved in the database.
     * @param {TestCaseResultCreateManyAndReturnArgs} args - Arguments to create many TestCaseResults.
     * @example
     * // Create many TestCaseResults
     * const testCaseResult = await prisma.testCaseResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestCaseResults and only return the `id`
     * const testCaseResultWithIdOnly = await prisma.testCaseResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestCaseResultCreateManyAndReturnArgs>(args?: SelectSubset<T, TestCaseResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestCaseResult.
     * @param {TestCaseResultDeleteArgs} args - Arguments to delete one TestCaseResult.
     * @example
     * // Delete one TestCaseResult
     * const TestCaseResult = await prisma.testCaseResult.delete({
     *   where: {
     *     // ... filter to delete one TestCaseResult
     *   }
     * })
     * 
     */
    delete<T extends TestCaseResultDeleteArgs>(args: SelectSubset<T, TestCaseResultDeleteArgs<ExtArgs>>): Prisma__TestCaseResultClient<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestCaseResult.
     * @param {TestCaseResultUpdateArgs} args - Arguments to update one TestCaseResult.
     * @example
     * // Update one TestCaseResult
     * const testCaseResult = await prisma.testCaseResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestCaseResultUpdateArgs>(args: SelectSubset<T, TestCaseResultUpdateArgs<ExtArgs>>): Prisma__TestCaseResultClient<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestCaseResults.
     * @param {TestCaseResultDeleteManyArgs} args - Arguments to filter TestCaseResults to delete.
     * @example
     * // Delete a few TestCaseResults
     * const { count } = await prisma.testCaseResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestCaseResultDeleteManyArgs>(args?: SelectSubset<T, TestCaseResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestCaseResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestCaseResults
     * const testCaseResult = await prisma.testCaseResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestCaseResultUpdateManyArgs>(args: SelectSubset<T, TestCaseResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestCaseResults and returns the data updated in the database.
     * @param {TestCaseResultUpdateManyAndReturnArgs} args - Arguments to update many TestCaseResults.
     * @example
     * // Update many TestCaseResults
     * const testCaseResult = await prisma.testCaseResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestCaseResults and only return the `id`
     * const testCaseResultWithIdOnly = await prisma.testCaseResult.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestCaseResultUpdateManyAndReturnArgs>(args: SelectSubset<T, TestCaseResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestCaseResult.
     * @param {TestCaseResultUpsertArgs} args - Arguments to update or create a TestCaseResult.
     * @example
     * // Update or create a TestCaseResult
     * const testCaseResult = await prisma.testCaseResult.upsert({
     *   create: {
     *     // ... data to create a TestCaseResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestCaseResult we want to update
     *   }
     * })
     */
    upsert<T extends TestCaseResultUpsertArgs>(args: SelectSubset<T, TestCaseResultUpsertArgs<ExtArgs>>): Prisma__TestCaseResultClient<$Result.GetResult<Prisma.$TestCaseResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestCaseResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseResultCountArgs} args - Arguments to filter TestCaseResults to count.
     * @example
     * // Count the number of TestCaseResults
     * const count = await prisma.testCaseResult.count({
     *   where: {
     *     // ... the filter for the TestCaseResults we want to count
     *   }
     * })
    **/
    count<T extends TestCaseResultCountArgs>(
      args?: Subset<T, TestCaseResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCaseResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestCaseResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestCaseResultAggregateArgs>(args: Subset<T, TestCaseResultAggregateArgs>): Prisma.PrismaPromise<GetTestCaseResultAggregateType<T>>

    /**
     * Group by TestCaseResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestCaseResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestCaseResultGroupByArgs['orderBy'] }
        : { orderBy?: TestCaseResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestCaseResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestCaseResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestCaseResult model
   */
  readonly fields: TestCaseResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestCaseResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestCaseResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submission<T extends SubmissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubmissionDefaultArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestCaseResult model
   */
  interface TestCaseResultFieldRefs {
    readonly id: FieldRef<"TestCaseResult", 'String'>
    readonly submissionId: FieldRef<"TestCaseResult", 'String'>
    readonly testCase: FieldRef<"TestCaseResult", 'Int'>
    readonly passed: FieldRef<"TestCaseResult", 'Boolean'>
    readonly stdout: FieldRef<"TestCaseResult", 'String'>
    readonly expected: FieldRef<"TestCaseResult", 'String'>
    readonly stderr: FieldRef<"TestCaseResult", 'String'>
    readonly compileOutput: FieldRef<"TestCaseResult", 'String'>
    readonly status: FieldRef<"TestCaseResult", 'String'>
    readonly memory: FieldRef<"TestCaseResult", 'String'>
    readonly time: FieldRef<"TestCaseResult", 'String'>
    readonly createdAt: FieldRef<"TestCaseResult", 'DateTime'>
    readonly updatedAt: FieldRef<"TestCaseResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestCaseResult findUnique
   */
  export type TestCaseResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * Filter, which TestCaseResult to fetch.
     */
    where: TestCaseResultWhereUniqueInput
  }

  /**
   * TestCaseResult findUniqueOrThrow
   */
  export type TestCaseResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * Filter, which TestCaseResult to fetch.
     */
    where: TestCaseResultWhereUniqueInput
  }

  /**
   * TestCaseResult findFirst
   */
  export type TestCaseResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * Filter, which TestCaseResult to fetch.
     */
    where?: TestCaseResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCaseResults to fetch.
     */
    orderBy?: TestCaseResultOrderByWithRelationInput | TestCaseResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestCaseResults.
     */
    cursor?: TestCaseResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCaseResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCaseResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestCaseResults.
     */
    distinct?: TestCaseResultScalarFieldEnum | TestCaseResultScalarFieldEnum[]
  }

  /**
   * TestCaseResult findFirstOrThrow
   */
  export type TestCaseResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * Filter, which TestCaseResult to fetch.
     */
    where?: TestCaseResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCaseResults to fetch.
     */
    orderBy?: TestCaseResultOrderByWithRelationInput | TestCaseResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestCaseResults.
     */
    cursor?: TestCaseResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCaseResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCaseResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestCaseResults.
     */
    distinct?: TestCaseResultScalarFieldEnum | TestCaseResultScalarFieldEnum[]
  }

  /**
   * TestCaseResult findMany
   */
  export type TestCaseResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * Filter, which TestCaseResults to fetch.
     */
    where?: TestCaseResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCaseResults to fetch.
     */
    orderBy?: TestCaseResultOrderByWithRelationInput | TestCaseResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestCaseResults.
     */
    cursor?: TestCaseResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCaseResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCaseResults.
     */
    skip?: number
    distinct?: TestCaseResultScalarFieldEnum | TestCaseResultScalarFieldEnum[]
  }

  /**
   * TestCaseResult create
   */
  export type TestCaseResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * The data needed to create a TestCaseResult.
     */
    data: XOR<TestCaseResultCreateInput, TestCaseResultUncheckedCreateInput>
  }

  /**
   * TestCaseResult createMany
   */
  export type TestCaseResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestCaseResults.
     */
    data: TestCaseResultCreateManyInput | TestCaseResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestCaseResult createManyAndReturn
   */
  export type TestCaseResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * The data used to create many TestCaseResults.
     */
    data: TestCaseResultCreateManyInput | TestCaseResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestCaseResult update
   */
  export type TestCaseResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * The data needed to update a TestCaseResult.
     */
    data: XOR<TestCaseResultUpdateInput, TestCaseResultUncheckedUpdateInput>
    /**
     * Choose, which TestCaseResult to update.
     */
    where: TestCaseResultWhereUniqueInput
  }

  /**
   * TestCaseResult updateMany
   */
  export type TestCaseResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestCaseResults.
     */
    data: XOR<TestCaseResultUpdateManyMutationInput, TestCaseResultUncheckedUpdateManyInput>
    /**
     * Filter which TestCaseResults to update
     */
    where?: TestCaseResultWhereInput
    /**
     * Limit how many TestCaseResults to update.
     */
    limit?: number
  }

  /**
   * TestCaseResult updateManyAndReturn
   */
  export type TestCaseResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * The data used to update TestCaseResults.
     */
    data: XOR<TestCaseResultUpdateManyMutationInput, TestCaseResultUncheckedUpdateManyInput>
    /**
     * Filter which TestCaseResults to update
     */
    where?: TestCaseResultWhereInput
    /**
     * Limit how many TestCaseResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestCaseResult upsert
   */
  export type TestCaseResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * The filter to search for the TestCaseResult to update in case it exists.
     */
    where: TestCaseResultWhereUniqueInput
    /**
     * In case the TestCaseResult found by the `where` argument doesn't exist, create a new TestCaseResult with this data.
     */
    create: XOR<TestCaseResultCreateInput, TestCaseResultUncheckedCreateInput>
    /**
     * In case the TestCaseResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestCaseResultUpdateInput, TestCaseResultUncheckedUpdateInput>
  }

  /**
   * TestCaseResult delete
   */
  export type TestCaseResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
    /**
     * Filter which TestCaseResult to delete.
     */
    where: TestCaseResultWhereUniqueInput
  }

  /**
   * TestCaseResult deleteMany
   */
  export type TestCaseResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestCaseResults to delete
     */
    where?: TestCaseResultWhereInput
    /**
     * Limit how many TestCaseResults to delete.
     */
    limit?: number
  }

  /**
   * TestCaseResult without action
   */
  export type TestCaseResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCaseResult
     */
    select?: TestCaseResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCaseResult
     */
    omit?: TestCaseResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseResultInclude<ExtArgs> | null
  }


  /**
   * Model ProblemSolved
   */

  export type AggregateProblemSolved = {
    _count: ProblemSolvedCountAggregateOutputType | null
    _min: ProblemSolvedMinAggregateOutputType | null
    _max: ProblemSolvedMaxAggregateOutputType | null
  }

  export type ProblemSolvedMinAggregateOutputType = {
    id: string | null
    userId: string | null
    problemId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemSolvedMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    problemId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemSolvedCountAggregateOutputType = {
    id: number
    userId: number
    problemId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProblemSolvedMinAggregateInputType = {
    id?: true
    userId?: true
    problemId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemSolvedMaxAggregateInputType = {
    id?: true
    userId?: true
    problemId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemSolvedCountAggregateInputType = {
    id?: true
    userId?: true
    problemId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProblemSolvedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemSolved to aggregate.
     */
    where?: ProblemSolvedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemSolveds to fetch.
     */
    orderBy?: ProblemSolvedOrderByWithRelationInput | ProblemSolvedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemSolvedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemSolveds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemSolveds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProblemSolveds
    **/
    _count?: true | ProblemSolvedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemSolvedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemSolvedMaxAggregateInputType
  }

  export type GetProblemSolvedAggregateType<T extends ProblemSolvedAggregateArgs> = {
        [P in keyof T & keyof AggregateProblemSolved]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblemSolved[P]>
      : GetScalarType<T[P], AggregateProblemSolved[P]>
  }




  export type ProblemSolvedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemSolvedWhereInput
    orderBy?: ProblemSolvedOrderByWithAggregationInput | ProblemSolvedOrderByWithAggregationInput[]
    by: ProblemSolvedScalarFieldEnum[] | ProblemSolvedScalarFieldEnum
    having?: ProblemSolvedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemSolvedCountAggregateInputType | true
    _min?: ProblemSolvedMinAggregateInputType
    _max?: ProblemSolvedMaxAggregateInputType
  }

  export type ProblemSolvedGroupByOutputType = {
    id: string
    userId: string
    problemId: string
    createdAt: Date
    updatedAt: Date
    _count: ProblemSolvedCountAggregateOutputType | null
    _min: ProblemSolvedMinAggregateOutputType | null
    _max: ProblemSolvedMaxAggregateOutputType | null
  }

  type GetProblemSolvedGroupByPayload<T extends ProblemSolvedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemSolvedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemSolvedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemSolvedGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemSolvedGroupByOutputType[P]>
        }
      >
    >


  export type ProblemSolvedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    problemId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemSolved"]>

  export type ProblemSolvedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    problemId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemSolved"]>

  export type ProblemSolvedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    problemId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemSolved"]>

  export type ProblemSolvedSelectScalar = {
    id?: boolean
    userId?: boolean
    problemId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProblemSolvedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "problemId" | "createdAt" | "updatedAt", ExtArgs["result"]["problemSolved"]>
  export type ProblemSolvedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProblemSolvedIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProblemSolvedIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProblemSolvedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProblemSolved"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      problemId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["problemSolved"]>
    composites: {}
  }

  type ProblemSolvedGetPayload<S extends boolean | null | undefined | ProblemSolvedDefaultArgs> = $Result.GetResult<Prisma.$ProblemSolvedPayload, S>

  type ProblemSolvedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProblemSolvedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProblemSolvedCountAggregateInputType | true
    }

  export interface ProblemSolvedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProblemSolved'], meta: { name: 'ProblemSolved' } }
    /**
     * Find zero or one ProblemSolved that matches the filter.
     * @param {ProblemSolvedFindUniqueArgs} args - Arguments to find a ProblemSolved
     * @example
     * // Get one ProblemSolved
     * const problemSolved = await prisma.problemSolved.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemSolvedFindUniqueArgs>(args: SelectSubset<T, ProblemSolvedFindUniqueArgs<ExtArgs>>): Prisma__ProblemSolvedClient<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProblemSolved that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProblemSolvedFindUniqueOrThrowArgs} args - Arguments to find a ProblemSolved
     * @example
     * // Get one ProblemSolved
     * const problemSolved = await prisma.problemSolved.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemSolvedFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemSolvedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemSolvedClient<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProblemSolved that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSolvedFindFirstArgs} args - Arguments to find a ProblemSolved
     * @example
     * // Get one ProblemSolved
     * const problemSolved = await prisma.problemSolved.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemSolvedFindFirstArgs>(args?: SelectSubset<T, ProblemSolvedFindFirstArgs<ExtArgs>>): Prisma__ProblemSolvedClient<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProblemSolved that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSolvedFindFirstOrThrowArgs} args - Arguments to find a ProblemSolved
     * @example
     * // Get one ProblemSolved
     * const problemSolved = await prisma.problemSolved.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemSolvedFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemSolvedFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemSolvedClient<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProblemSolveds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSolvedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProblemSolveds
     * const problemSolveds = await prisma.problemSolved.findMany()
     * 
     * // Get first 10 ProblemSolveds
     * const problemSolveds = await prisma.problemSolved.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemSolvedWithIdOnly = await prisma.problemSolved.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemSolvedFindManyArgs>(args?: SelectSubset<T, ProblemSolvedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProblemSolved.
     * @param {ProblemSolvedCreateArgs} args - Arguments to create a ProblemSolved.
     * @example
     * // Create one ProblemSolved
     * const ProblemSolved = await prisma.problemSolved.create({
     *   data: {
     *     // ... data to create a ProblemSolved
     *   }
     * })
     * 
     */
    create<T extends ProblemSolvedCreateArgs>(args: SelectSubset<T, ProblemSolvedCreateArgs<ExtArgs>>): Prisma__ProblemSolvedClient<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProblemSolveds.
     * @param {ProblemSolvedCreateManyArgs} args - Arguments to create many ProblemSolveds.
     * @example
     * // Create many ProblemSolveds
     * const problemSolved = await prisma.problemSolved.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemSolvedCreateManyArgs>(args?: SelectSubset<T, ProblemSolvedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProblemSolveds and returns the data saved in the database.
     * @param {ProblemSolvedCreateManyAndReturnArgs} args - Arguments to create many ProblemSolveds.
     * @example
     * // Create many ProblemSolveds
     * const problemSolved = await prisma.problemSolved.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProblemSolveds and only return the `id`
     * const problemSolvedWithIdOnly = await prisma.problemSolved.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemSolvedCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemSolvedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProblemSolved.
     * @param {ProblemSolvedDeleteArgs} args - Arguments to delete one ProblemSolved.
     * @example
     * // Delete one ProblemSolved
     * const ProblemSolved = await prisma.problemSolved.delete({
     *   where: {
     *     // ... filter to delete one ProblemSolved
     *   }
     * })
     * 
     */
    delete<T extends ProblemSolvedDeleteArgs>(args: SelectSubset<T, ProblemSolvedDeleteArgs<ExtArgs>>): Prisma__ProblemSolvedClient<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProblemSolved.
     * @param {ProblemSolvedUpdateArgs} args - Arguments to update one ProblemSolved.
     * @example
     * // Update one ProblemSolved
     * const problemSolved = await prisma.problemSolved.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemSolvedUpdateArgs>(args: SelectSubset<T, ProblemSolvedUpdateArgs<ExtArgs>>): Prisma__ProblemSolvedClient<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProblemSolveds.
     * @param {ProblemSolvedDeleteManyArgs} args - Arguments to filter ProblemSolveds to delete.
     * @example
     * // Delete a few ProblemSolveds
     * const { count } = await prisma.problemSolved.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemSolvedDeleteManyArgs>(args?: SelectSubset<T, ProblemSolvedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemSolveds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSolvedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProblemSolveds
     * const problemSolved = await prisma.problemSolved.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemSolvedUpdateManyArgs>(args: SelectSubset<T, ProblemSolvedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemSolveds and returns the data updated in the database.
     * @param {ProblemSolvedUpdateManyAndReturnArgs} args - Arguments to update many ProblemSolveds.
     * @example
     * // Update many ProblemSolveds
     * const problemSolved = await prisma.problemSolved.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProblemSolveds and only return the `id`
     * const problemSolvedWithIdOnly = await prisma.problemSolved.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProblemSolvedUpdateManyAndReturnArgs>(args: SelectSubset<T, ProblemSolvedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProblemSolved.
     * @param {ProblemSolvedUpsertArgs} args - Arguments to update or create a ProblemSolved.
     * @example
     * // Update or create a ProblemSolved
     * const problemSolved = await prisma.problemSolved.upsert({
     *   create: {
     *     // ... data to create a ProblemSolved
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProblemSolved we want to update
     *   }
     * })
     */
    upsert<T extends ProblemSolvedUpsertArgs>(args: SelectSubset<T, ProblemSolvedUpsertArgs<ExtArgs>>): Prisma__ProblemSolvedClient<$Result.GetResult<Prisma.$ProblemSolvedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProblemSolveds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSolvedCountArgs} args - Arguments to filter ProblemSolveds to count.
     * @example
     * // Count the number of ProblemSolveds
     * const count = await prisma.problemSolved.count({
     *   where: {
     *     // ... the filter for the ProblemSolveds we want to count
     *   }
     * })
    **/
    count<T extends ProblemSolvedCountArgs>(
      args?: Subset<T, ProblemSolvedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemSolvedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProblemSolved.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSolvedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemSolvedAggregateArgs>(args: Subset<T, ProblemSolvedAggregateArgs>): Prisma.PrismaPromise<GetProblemSolvedAggregateType<T>>

    /**
     * Group by ProblemSolved.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSolvedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemSolvedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemSolvedGroupByArgs['orderBy'] }
        : { orderBy?: ProblemSolvedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemSolvedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemSolvedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProblemSolved model
   */
  readonly fields: ProblemSolvedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProblemSolved.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemSolvedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProblemSolved model
   */
  interface ProblemSolvedFieldRefs {
    readonly id: FieldRef<"ProblemSolved", 'String'>
    readonly userId: FieldRef<"ProblemSolved", 'String'>
    readonly problemId: FieldRef<"ProblemSolved", 'String'>
    readonly createdAt: FieldRef<"ProblemSolved", 'DateTime'>
    readonly updatedAt: FieldRef<"ProblemSolved", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProblemSolved findUnique
   */
  export type ProblemSolvedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSolved to fetch.
     */
    where: ProblemSolvedWhereUniqueInput
  }

  /**
   * ProblemSolved findUniqueOrThrow
   */
  export type ProblemSolvedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSolved to fetch.
     */
    where: ProblemSolvedWhereUniqueInput
  }

  /**
   * ProblemSolved findFirst
   */
  export type ProblemSolvedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSolved to fetch.
     */
    where?: ProblemSolvedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemSolveds to fetch.
     */
    orderBy?: ProblemSolvedOrderByWithRelationInput | ProblemSolvedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemSolveds.
     */
    cursor?: ProblemSolvedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemSolveds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemSolveds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemSolveds.
     */
    distinct?: ProblemSolvedScalarFieldEnum | ProblemSolvedScalarFieldEnum[]
  }

  /**
   * ProblemSolved findFirstOrThrow
   */
  export type ProblemSolvedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSolved to fetch.
     */
    where?: ProblemSolvedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemSolveds to fetch.
     */
    orderBy?: ProblemSolvedOrderByWithRelationInput | ProblemSolvedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemSolveds.
     */
    cursor?: ProblemSolvedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemSolveds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemSolveds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemSolveds.
     */
    distinct?: ProblemSolvedScalarFieldEnum | ProblemSolvedScalarFieldEnum[]
  }

  /**
   * ProblemSolved findMany
   */
  export type ProblemSolvedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSolveds to fetch.
     */
    where?: ProblemSolvedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemSolveds to fetch.
     */
    orderBy?: ProblemSolvedOrderByWithRelationInput | ProblemSolvedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProblemSolveds.
     */
    cursor?: ProblemSolvedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemSolveds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemSolveds.
     */
    skip?: number
    distinct?: ProblemSolvedScalarFieldEnum | ProblemSolvedScalarFieldEnum[]
  }

  /**
   * ProblemSolved create
   */
  export type ProblemSolvedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * The data needed to create a ProblemSolved.
     */
    data: XOR<ProblemSolvedCreateInput, ProblemSolvedUncheckedCreateInput>
  }

  /**
   * ProblemSolved createMany
   */
  export type ProblemSolvedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProblemSolveds.
     */
    data: ProblemSolvedCreateManyInput | ProblemSolvedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProblemSolved createManyAndReturn
   */
  export type ProblemSolvedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * The data used to create many ProblemSolveds.
     */
    data: ProblemSolvedCreateManyInput | ProblemSolvedCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemSolved update
   */
  export type ProblemSolvedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * The data needed to update a ProblemSolved.
     */
    data: XOR<ProblemSolvedUpdateInput, ProblemSolvedUncheckedUpdateInput>
    /**
     * Choose, which ProblemSolved to update.
     */
    where: ProblemSolvedWhereUniqueInput
  }

  /**
   * ProblemSolved updateMany
   */
  export type ProblemSolvedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProblemSolveds.
     */
    data: XOR<ProblemSolvedUpdateManyMutationInput, ProblemSolvedUncheckedUpdateManyInput>
    /**
     * Filter which ProblemSolveds to update
     */
    where?: ProblemSolvedWhereInput
    /**
     * Limit how many ProblemSolveds to update.
     */
    limit?: number
  }

  /**
   * ProblemSolved updateManyAndReturn
   */
  export type ProblemSolvedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * The data used to update ProblemSolveds.
     */
    data: XOR<ProblemSolvedUpdateManyMutationInput, ProblemSolvedUncheckedUpdateManyInput>
    /**
     * Filter which ProblemSolveds to update
     */
    where?: ProblemSolvedWhereInput
    /**
     * Limit how many ProblemSolveds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemSolved upsert
   */
  export type ProblemSolvedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * The filter to search for the ProblemSolved to update in case it exists.
     */
    where: ProblemSolvedWhereUniqueInput
    /**
     * In case the ProblemSolved found by the `where` argument doesn't exist, create a new ProblemSolved with this data.
     */
    create: XOR<ProblemSolvedCreateInput, ProblemSolvedUncheckedCreateInput>
    /**
     * In case the ProblemSolved was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemSolvedUpdateInput, ProblemSolvedUncheckedUpdateInput>
  }

  /**
   * ProblemSolved delete
   */
  export type ProblemSolvedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
    /**
     * Filter which ProblemSolved to delete.
     */
    where: ProblemSolvedWhereUniqueInput
  }

  /**
   * ProblemSolved deleteMany
   */
  export type ProblemSolvedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemSolveds to delete
     */
    where?: ProblemSolvedWhereInput
    /**
     * Limit how many ProblemSolveds to delete.
     */
    limit?: number
  }

  /**
   * ProblemSolved without action
   */
  export type ProblemSolvedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolved
     */
    select?: ProblemSolvedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolved
     */
    omit?: ProblemSolvedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSolvedInclude<ExtArgs> | null
  }


  /**
   * Model Playlist
   */

  export type AggregatePlaylist = {
    _count: PlaylistCountAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  export type PlaylistMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type PlaylistMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type PlaylistCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type PlaylistMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PlaylistMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PlaylistCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type PlaylistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playlist to aggregate.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Playlists
    **/
    _count?: true | PlaylistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistMaxAggregateInputType
  }

  export type GetPlaylistAggregateType<T extends PlaylistAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylist[P]>
      : GetScalarType<T[P], AggregatePlaylist[P]>
  }




  export type PlaylistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistWhereInput
    orderBy?: PlaylistOrderByWithAggregationInput | PlaylistOrderByWithAggregationInput[]
    by: PlaylistScalarFieldEnum[] | PlaylistScalarFieldEnum
    having?: PlaylistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistCountAggregateInputType | true
    _min?: PlaylistMinAggregateInputType
    _max?: PlaylistMaxAggregateInputType
  }

  export type PlaylistGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: PlaylistCountAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  type GetPlaylistGroupByPayload<T extends PlaylistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
        }
      >
    >


  export type PlaylistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    problems?: boolean | Playlist$problemsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type PlaylistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["playlist"]>
  export type PlaylistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | Playlist$problemsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlaylistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PlaylistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PlaylistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Playlist"
    objects: {
      problems: Prisma.$ProblemPlaylistPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["playlist"]>
    composites: {}
  }

  type PlaylistGetPayload<S extends boolean | null | undefined | PlaylistDefaultArgs> = $Result.GetResult<Prisma.$PlaylistPayload, S>

  type PlaylistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaylistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaylistCountAggregateInputType | true
    }

  export interface PlaylistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Playlist'], meta: { name: 'Playlist' } }
    /**
     * Find zero or one Playlist that matches the filter.
     * @param {PlaylistFindUniqueArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaylistFindUniqueArgs>(args: SelectSubset<T, PlaylistFindUniqueArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaylistFindUniqueOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaylistFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaylistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindFirstArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaylistFindFirstArgs>(args?: SelectSubset<T, PlaylistFindFirstArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindFirstOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaylistFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaylistFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playlists
     * const playlists = await prisma.playlist.findMany()
     * 
     * // Get first 10 Playlists
     * const playlists = await prisma.playlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playlistWithIdOnly = await prisma.playlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaylistFindManyArgs>(args?: SelectSubset<T, PlaylistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playlist.
     * @param {PlaylistCreateArgs} args - Arguments to create a Playlist.
     * @example
     * // Create one Playlist
     * const Playlist = await prisma.playlist.create({
     *   data: {
     *     // ... data to create a Playlist
     *   }
     * })
     * 
     */
    create<T extends PlaylistCreateArgs>(args: SelectSubset<T, PlaylistCreateArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playlists.
     * @param {PlaylistCreateManyArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaylistCreateManyArgs>(args?: SelectSubset<T, PlaylistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Playlists and returns the data saved in the database.
     * @param {PlaylistCreateManyAndReturnArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Playlists and only return the `id`
     * const playlistWithIdOnly = await prisma.playlist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaylistCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaylistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Playlist.
     * @param {PlaylistDeleteArgs} args - Arguments to delete one Playlist.
     * @example
     * // Delete one Playlist
     * const Playlist = await prisma.playlist.delete({
     *   where: {
     *     // ... filter to delete one Playlist
     *   }
     * })
     * 
     */
    delete<T extends PlaylistDeleteArgs>(args: SelectSubset<T, PlaylistDeleteArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playlist.
     * @param {PlaylistUpdateArgs} args - Arguments to update one Playlist.
     * @example
     * // Update one Playlist
     * const playlist = await prisma.playlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaylistUpdateArgs>(args: SelectSubset<T, PlaylistUpdateArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playlists.
     * @param {PlaylistDeleteManyArgs} args - Arguments to filter Playlists to delete.
     * @example
     * // Delete a few Playlists
     * const { count } = await prisma.playlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaylistDeleteManyArgs>(args?: SelectSubset<T, PlaylistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaylistUpdateManyArgs>(args: SelectSubset<T, PlaylistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists and returns the data updated in the database.
     * @param {PlaylistUpdateManyAndReturnArgs} args - Arguments to update many Playlists.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Playlists and only return the `id`
     * const playlistWithIdOnly = await prisma.playlist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlaylistUpdateManyAndReturnArgs>(args: SelectSubset<T, PlaylistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Playlist.
     * @param {PlaylistUpsertArgs} args - Arguments to update or create a Playlist.
     * @example
     * // Update or create a Playlist
     * const playlist = await prisma.playlist.upsert({
     *   create: {
     *     // ... data to create a Playlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playlist we want to update
     *   }
     * })
     */
    upsert<T extends PlaylistUpsertArgs>(args: SelectSubset<T, PlaylistUpsertArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCountArgs} args - Arguments to filter Playlists to count.
     * @example
     * // Count the number of Playlists
     * const count = await prisma.playlist.count({
     *   where: {
     *     // ... the filter for the Playlists we want to count
     *   }
     * })
    **/
    count<T extends PlaylistCountArgs>(
      args?: Subset<T, PlaylistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaylistAggregateArgs>(args: Subset<T, PlaylistAggregateArgs>): Prisma.PrismaPromise<GetPlaylistAggregateType<T>>

    /**
     * Group by Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaylistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaylistGroupByArgs['orderBy'] }
        : { orderBy?: PlaylistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaylistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Playlist model
   */
  readonly fields: PlaylistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Playlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaylistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problems<T extends Playlist$problemsArgs<ExtArgs> = {}>(args?: Subset<T, Playlist$problemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Playlist model
   */
  interface PlaylistFieldRefs {
    readonly id: FieldRef<"Playlist", 'String'>
    readonly name: FieldRef<"Playlist", 'String'>
    readonly description: FieldRef<"Playlist", 'String'>
    readonly createdAt: FieldRef<"Playlist", 'DateTime'>
    readonly updatedAt: FieldRef<"Playlist", 'DateTime'>
    readonly userId: FieldRef<"Playlist", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Playlist findUnique
   */
  export type PlaylistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist findUniqueOrThrow
   */
  export type PlaylistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist findFirst
   */
  export type PlaylistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist findFirstOrThrow
   */
  export type PlaylistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist findMany
   */
  export type PlaylistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlists to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist create
   */
  export type PlaylistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The data needed to create a Playlist.
     */
    data: XOR<PlaylistCreateInput, PlaylistUncheckedCreateInput>
  }

  /**
   * Playlist createMany
   */
  export type PlaylistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Playlists.
     */
    data: PlaylistCreateManyInput | PlaylistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Playlist createManyAndReturn
   */
  export type PlaylistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * The data used to create many Playlists.
     */
    data: PlaylistCreateManyInput | PlaylistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Playlist update
   */
  export type PlaylistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The data needed to update a Playlist.
     */
    data: XOR<PlaylistUpdateInput, PlaylistUncheckedUpdateInput>
    /**
     * Choose, which Playlist to update.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist updateMany
   */
  export type PlaylistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Playlists.
     */
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyInput>
    /**
     * Filter which Playlists to update
     */
    where?: PlaylistWhereInput
    /**
     * Limit how many Playlists to update.
     */
    limit?: number
  }

  /**
   * Playlist updateManyAndReturn
   */
  export type PlaylistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * The data used to update Playlists.
     */
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyInput>
    /**
     * Filter which Playlists to update
     */
    where?: PlaylistWhereInput
    /**
     * Limit how many Playlists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Playlist upsert
   */
  export type PlaylistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The filter to search for the Playlist to update in case it exists.
     */
    where: PlaylistWhereUniqueInput
    /**
     * In case the Playlist found by the `where` argument doesn't exist, create a new Playlist with this data.
     */
    create: XOR<PlaylistCreateInput, PlaylistUncheckedCreateInput>
    /**
     * In case the Playlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaylistUpdateInput, PlaylistUncheckedUpdateInput>
  }

  /**
   * Playlist delete
   */
  export type PlaylistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter which Playlist to delete.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist deleteMany
   */
  export type PlaylistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playlists to delete
     */
    where?: PlaylistWhereInput
    /**
     * Limit how many Playlists to delete.
     */
    limit?: number
  }

  /**
   * Playlist.problems
   */
  export type Playlist$problemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    where?: ProblemPlaylistWhereInput
    orderBy?: ProblemPlaylistOrderByWithRelationInput | ProblemPlaylistOrderByWithRelationInput[]
    cursor?: ProblemPlaylistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemPlaylistScalarFieldEnum | ProblemPlaylistScalarFieldEnum[]
  }

  /**
   * Playlist without action
   */
  export type PlaylistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
  }


  /**
   * Model ProblemPlaylist
   */

  export type AggregateProblemPlaylist = {
    _count: ProblemPlaylistCountAggregateOutputType | null
    _min: ProblemPlaylistMinAggregateOutputType | null
    _max: ProblemPlaylistMaxAggregateOutputType | null
  }

  export type ProblemPlaylistMinAggregateOutputType = {
    id: string | null
    problemId: string | null
    playlistId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemPlaylistMaxAggregateOutputType = {
    id: string | null
    problemId: string | null
    playlistId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemPlaylistCountAggregateOutputType = {
    id: number
    problemId: number
    playlistId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProblemPlaylistMinAggregateInputType = {
    id?: true
    problemId?: true
    playlistId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemPlaylistMaxAggregateInputType = {
    id?: true
    problemId?: true
    playlistId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemPlaylistCountAggregateInputType = {
    id?: true
    problemId?: true
    playlistId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProblemPlaylistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemPlaylist to aggregate.
     */
    where?: ProblemPlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemPlaylists to fetch.
     */
    orderBy?: ProblemPlaylistOrderByWithRelationInput | ProblemPlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemPlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemPlaylists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemPlaylists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProblemPlaylists
    **/
    _count?: true | ProblemPlaylistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemPlaylistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemPlaylistMaxAggregateInputType
  }

  export type GetProblemPlaylistAggregateType<T extends ProblemPlaylistAggregateArgs> = {
        [P in keyof T & keyof AggregateProblemPlaylist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblemPlaylist[P]>
      : GetScalarType<T[P], AggregateProblemPlaylist[P]>
  }




  export type ProblemPlaylistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemPlaylistWhereInput
    orderBy?: ProblemPlaylistOrderByWithAggregationInput | ProblemPlaylistOrderByWithAggregationInput[]
    by: ProblemPlaylistScalarFieldEnum[] | ProblemPlaylistScalarFieldEnum
    having?: ProblemPlaylistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemPlaylistCountAggregateInputType | true
    _min?: ProblemPlaylistMinAggregateInputType
    _max?: ProblemPlaylistMaxAggregateInputType
  }

  export type ProblemPlaylistGroupByOutputType = {
    id: string
    problemId: string
    playlistId: string
    createdAt: Date
    updatedAt: Date
    _count: ProblemPlaylistCountAggregateOutputType | null
    _min: ProblemPlaylistMinAggregateOutputType | null
    _max: ProblemPlaylistMaxAggregateOutputType | null
  }

  type GetProblemPlaylistGroupByPayload<T extends ProblemPlaylistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemPlaylistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemPlaylistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemPlaylistGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemPlaylistGroupByOutputType[P]>
        }
      >
    >


  export type ProblemPlaylistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    playlistId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemPlaylist"]>

  export type ProblemPlaylistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    playlistId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemPlaylist"]>

  export type ProblemPlaylistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    problemId?: boolean
    playlistId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problemPlaylist"]>

  export type ProblemPlaylistSelectScalar = {
    id?: boolean
    problemId?: boolean
    playlistId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProblemPlaylistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "problemId" | "playlistId" | "createdAt" | "updatedAt", ExtArgs["result"]["problemPlaylist"]>
  export type ProblemPlaylistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type ProblemPlaylistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type ProblemPlaylistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }

  export type $ProblemPlaylistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProblemPlaylist"
    objects: {
      playlist: Prisma.$PlaylistPayload<ExtArgs>
      problem: Prisma.$ProblemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      problemId: string
      playlistId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["problemPlaylist"]>
    composites: {}
  }

  type ProblemPlaylistGetPayload<S extends boolean | null | undefined | ProblemPlaylistDefaultArgs> = $Result.GetResult<Prisma.$ProblemPlaylistPayload, S>

  type ProblemPlaylistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProblemPlaylistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProblemPlaylistCountAggregateInputType | true
    }

  export interface ProblemPlaylistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProblemPlaylist'], meta: { name: 'ProblemPlaylist' } }
    /**
     * Find zero or one ProblemPlaylist that matches the filter.
     * @param {ProblemPlaylistFindUniqueArgs} args - Arguments to find a ProblemPlaylist
     * @example
     * // Get one ProblemPlaylist
     * const problemPlaylist = await prisma.problemPlaylist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemPlaylistFindUniqueArgs>(args: SelectSubset<T, ProblemPlaylistFindUniqueArgs<ExtArgs>>): Prisma__ProblemPlaylistClient<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProblemPlaylist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProblemPlaylistFindUniqueOrThrowArgs} args - Arguments to find a ProblemPlaylist
     * @example
     * // Get one ProblemPlaylist
     * const problemPlaylist = await prisma.problemPlaylist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemPlaylistFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemPlaylistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemPlaylistClient<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProblemPlaylist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPlaylistFindFirstArgs} args - Arguments to find a ProblemPlaylist
     * @example
     * // Get one ProblemPlaylist
     * const problemPlaylist = await prisma.problemPlaylist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemPlaylistFindFirstArgs>(args?: SelectSubset<T, ProblemPlaylistFindFirstArgs<ExtArgs>>): Prisma__ProblemPlaylistClient<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProblemPlaylist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPlaylistFindFirstOrThrowArgs} args - Arguments to find a ProblemPlaylist
     * @example
     * // Get one ProblemPlaylist
     * const problemPlaylist = await prisma.problemPlaylist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemPlaylistFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemPlaylistFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemPlaylistClient<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProblemPlaylists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPlaylistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProblemPlaylists
     * const problemPlaylists = await prisma.problemPlaylist.findMany()
     * 
     * // Get first 10 ProblemPlaylists
     * const problemPlaylists = await prisma.problemPlaylist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemPlaylistWithIdOnly = await prisma.problemPlaylist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemPlaylistFindManyArgs>(args?: SelectSubset<T, ProblemPlaylistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProblemPlaylist.
     * @param {ProblemPlaylistCreateArgs} args - Arguments to create a ProblemPlaylist.
     * @example
     * // Create one ProblemPlaylist
     * const ProblemPlaylist = await prisma.problemPlaylist.create({
     *   data: {
     *     // ... data to create a ProblemPlaylist
     *   }
     * })
     * 
     */
    create<T extends ProblemPlaylistCreateArgs>(args: SelectSubset<T, ProblemPlaylistCreateArgs<ExtArgs>>): Prisma__ProblemPlaylistClient<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProblemPlaylists.
     * @param {ProblemPlaylistCreateManyArgs} args - Arguments to create many ProblemPlaylists.
     * @example
     * // Create many ProblemPlaylists
     * const problemPlaylist = await prisma.problemPlaylist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemPlaylistCreateManyArgs>(args?: SelectSubset<T, ProblemPlaylistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProblemPlaylists and returns the data saved in the database.
     * @param {ProblemPlaylistCreateManyAndReturnArgs} args - Arguments to create many ProblemPlaylists.
     * @example
     * // Create many ProblemPlaylists
     * const problemPlaylist = await prisma.problemPlaylist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProblemPlaylists and only return the `id`
     * const problemPlaylistWithIdOnly = await prisma.problemPlaylist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemPlaylistCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemPlaylistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProblemPlaylist.
     * @param {ProblemPlaylistDeleteArgs} args - Arguments to delete one ProblemPlaylist.
     * @example
     * // Delete one ProblemPlaylist
     * const ProblemPlaylist = await prisma.problemPlaylist.delete({
     *   where: {
     *     // ... filter to delete one ProblemPlaylist
     *   }
     * })
     * 
     */
    delete<T extends ProblemPlaylistDeleteArgs>(args: SelectSubset<T, ProblemPlaylistDeleteArgs<ExtArgs>>): Prisma__ProblemPlaylistClient<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProblemPlaylist.
     * @param {ProblemPlaylistUpdateArgs} args - Arguments to update one ProblemPlaylist.
     * @example
     * // Update one ProblemPlaylist
     * const problemPlaylist = await prisma.problemPlaylist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemPlaylistUpdateArgs>(args: SelectSubset<T, ProblemPlaylistUpdateArgs<ExtArgs>>): Prisma__ProblemPlaylistClient<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProblemPlaylists.
     * @param {ProblemPlaylistDeleteManyArgs} args - Arguments to filter ProblemPlaylists to delete.
     * @example
     * // Delete a few ProblemPlaylists
     * const { count } = await prisma.problemPlaylist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemPlaylistDeleteManyArgs>(args?: SelectSubset<T, ProblemPlaylistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemPlaylists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPlaylistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProblemPlaylists
     * const problemPlaylist = await prisma.problemPlaylist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemPlaylistUpdateManyArgs>(args: SelectSubset<T, ProblemPlaylistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemPlaylists and returns the data updated in the database.
     * @param {ProblemPlaylistUpdateManyAndReturnArgs} args - Arguments to update many ProblemPlaylists.
     * @example
     * // Update many ProblemPlaylists
     * const problemPlaylist = await prisma.problemPlaylist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProblemPlaylists and only return the `id`
     * const problemPlaylistWithIdOnly = await prisma.problemPlaylist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProblemPlaylistUpdateManyAndReturnArgs>(args: SelectSubset<T, ProblemPlaylistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProblemPlaylist.
     * @param {ProblemPlaylistUpsertArgs} args - Arguments to update or create a ProblemPlaylist.
     * @example
     * // Update or create a ProblemPlaylist
     * const problemPlaylist = await prisma.problemPlaylist.upsert({
     *   create: {
     *     // ... data to create a ProblemPlaylist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProblemPlaylist we want to update
     *   }
     * })
     */
    upsert<T extends ProblemPlaylistUpsertArgs>(args: SelectSubset<T, ProblemPlaylistUpsertArgs<ExtArgs>>): Prisma__ProblemPlaylistClient<$Result.GetResult<Prisma.$ProblemPlaylistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProblemPlaylists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPlaylistCountArgs} args - Arguments to filter ProblemPlaylists to count.
     * @example
     * // Count the number of ProblemPlaylists
     * const count = await prisma.problemPlaylist.count({
     *   where: {
     *     // ... the filter for the ProblemPlaylists we want to count
     *   }
     * })
    **/
    count<T extends ProblemPlaylistCountArgs>(
      args?: Subset<T, ProblemPlaylistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemPlaylistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProblemPlaylist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPlaylistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemPlaylistAggregateArgs>(args: Subset<T, ProblemPlaylistAggregateArgs>): Prisma.PrismaPromise<GetProblemPlaylistAggregateType<T>>

    /**
     * Group by ProblemPlaylist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemPlaylistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemPlaylistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemPlaylistGroupByArgs['orderBy'] }
        : { orderBy?: ProblemPlaylistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemPlaylistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemPlaylistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProblemPlaylist model
   */
  readonly fields: ProblemPlaylistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProblemPlaylist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemPlaylistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlist<T extends PlaylistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlaylistDefaultArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProblemPlaylist model
   */
  interface ProblemPlaylistFieldRefs {
    readonly id: FieldRef<"ProblemPlaylist", 'String'>
    readonly problemId: FieldRef<"ProblemPlaylist", 'String'>
    readonly playlistId: FieldRef<"ProblemPlaylist", 'String'>
    readonly createdAt: FieldRef<"ProblemPlaylist", 'DateTime'>
    readonly updatedAt: FieldRef<"ProblemPlaylist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProblemPlaylist findUnique
   */
  export type ProblemPlaylistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPlaylist to fetch.
     */
    where: ProblemPlaylistWhereUniqueInput
  }

  /**
   * ProblemPlaylist findUniqueOrThrow
   */
  export type ProblemPlaylistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPlaylist to fetch.
     */
    where: ProblemPlaylistWhereUniqueInput
  }

  /**
   * ProblemPlaylist findFirst
   */
  export type ProblemPlaylistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPlaylist to fetch.
     */
    where?: ProblemPlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemPlaylists to fetch.
     */
    orderBy?: ProblemPlaylistOrderByWithRelationInput | ProblemPlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemPlaylists.
     */
    cursor?: ProblemPlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemPlaylists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemPlaylists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemPlaylists.
     */
    distinct?: ProblemPlaylistScalarFieldEnum | ProblemPlaylistScalarFieldEnum[]
  }

  /**
   * ProblemPlaylist findFirstOrThrow
   */
  export type ProblemPlaylistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPlaylist to fetch.
     */
    where?: ProblemPlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemPlaylists to fetch.
     */
    orderBy?: ProblemPlaylistOrderByWithRelationInput | ProblemPlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemPlaylists.
     */
    cursor?: ProblemPlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemPlaylists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemPlaylists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemPlaylists.
     */
    distinct?: ProblemPlaylistScalarFieldEnum | ProblemPlaylistScalarFieldEnum[]
  }

  /**
   * ProblemPlaylist findMany
   */
  export type ProblemPlaylistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * Filter, which ProblemPlaylists to fetch.
     */
    where?: ProblemPlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemPlaylists to fetch.
     */
    orderBy?: ProblemPlaylistOrderByWithRelationInput | ProblemPlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProblemPlaylists.
     */
    cursor?: ProblemPlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemPlaylists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemPlaylists.
     */
    skip?: number
    distinct?: ProblemPlaylistScalarFieldEnum | ProblemPlaylistScalarFieldEnum[]
  }

  /**
   * ProblemPlaylist create
   */
  export type ProblemPlaylistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * The data needed to create a ProblemPlaylist.
     */
    data: XOR<ProblemPlaylistCreateInput, ProblemPlaylistUncheckedCreateInput>
  }

  /**
   * ProblemPlaylist createMany
   */
  export type ProblemPlaylistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProblemPlaylists.
     */
    data: ProblemPlaylistCreateManyInput | ProblemPlaylistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProblemPlaylist createManyAndReturn
   */
  export type ProblemPlaylistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * The data used to create many ProblemPlaylists.
     */
    data: ProblemPlaylistCreateManyInput | ProblemPlaylistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemPlaylist update
   */
  export type ProblemPlaylistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * The data needed to update a ProblemPlaylist.
     */
    data: XOR<ProblemPlaylistUpdateInput, ProblemPlaylistUncheckedUpdateInput>
    /**
     * Choose, which ProblemPlaylist to update.
     */
    where: ProblemPlaylistWhereUniqueInput
  }

  /**
   * ProblemPlaylist updateMany
   */
  export type ProblemPlaylistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProblemPlaylists.
     */
    data: XOR<ProblemPlaylistUpdateManyMutationInput, ProblemPlaylistUncheckedUpdateManyInput>
    /**
     * Filter which ProblemPlaylists to update
     */
    where?: ProblemPlaylistWhereInput
    /**
     * Limit how many ProblemPlaylists to update.
     */
    limit?: number
  }

  /**
   * ProblemPlaylist updateManyAndReturn
   */
  export type ProblemPlaylistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * The data used to update ProblemPlaylists.
     */
    data: XOR<ProblemPlaylistUpdateManyMutationInput, ProblemPlaylistUncheckedUpdateManyInput>
    /**
     * Filter which ProblemPlaylists to update
     */
    where?: ProblemPlaylistWhereInput
    /**
     * Limit how many ProblemPlaylists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemPlaylist upsert
   */
  export type ProblemPlaylistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * The filter to search for the ProblemPlaylist to update in case it exists.
     */
    where: ProblemPlaylistWhereUniqueInput
    /**
     * In case the ProblemPlaylist found by the `where` argument doesn't exist, create a new ProblemPlaylist with this data.
     */
    create: XOR<ProblemPlaylistCreateInput, ProblemPlaylistUncheckedCreateInput>
    /**
     * In case the ProblemPlaylist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemPlaylistUpdateInput, ProblemPlaylistUncheckedUpdateInput>
  }

  /**
   * ProblemPlaylist delete
   */
  export type ProblemPlaylistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
    /**
     * Filter which ProblemPlaylist to delete.
     */
    where: ProblemPlaylistWhereUniqueInput
  }

  /**
   * ProblemPlaylist deleteMany
   */
  export type ProblemPlaylistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemPlaylists to delete
     */
    where?: ProblemPlaylistWhereInput
    /**
     * Limit how many ProblemPlaylists to delete.
     */
    limit?: number
  }

  /**
   * ProblemPlaylist without action
   */
  export type ProblemPlaylistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemPlaylist
     */
    select?: ProblemPlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemPlaylist
     */
    omit?: ProblemPlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemPlaylistInclude<ExtArgs> | null
  }


  /**
   * Model Revision
   */

  export type AggregateRevision = {
    _count: RevisionCountAggregateOutputType | null
    _min: RevisionMinAggregateOutputType | null
    _max: RevisionMaxAggregateOutputType | null
  }

  export type RevisionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    problemId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RevisionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    problemId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RevisionCountAggregateOutputType = {
    id: number
    userId: number
    problemId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RevisionMinAggregateInputType = {
    id?: true
    userId?: true
    problemId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RevisionMaxAggregateInputType = {
    id?: true
    userId?: true
    problemId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RevisionCountAggregateInputType = {
    id?: true
    userId?: true
    problemId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RevisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Revision to aggregate.
     */
    where?: RevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revisions to fetch.
     */
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Revisions
    **/
    _count?: true | RevisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RevisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RevisionMaxAggregateInputType
  }

  export type GetRevisionAggregateType<T extends RevisionAggregateArgs> = {
        [P in keyof T & keyof AggregateRevision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRevision[P]>
      : GetScalarType<T[P], AggregateRevision[P]>
  }




  export type RevisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RevisionWhereInput
    orderBy?: RevisionOrderByWithAggregationInput | RevisionOrderByWithAggregationInput[]
    by: RevisionScalarFieldEnum[] | RevisionScalarFieldEnum
    having?: RevisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RevisionCountAggregateInputType | true
    _min?: RevisionMinAggregateInputType
    _max?: RevisionMaxAggregateInputType
  }

  export type RevisionGroupByOutputType = {
    id: string
    userId: string
    problemId: string
    createdAt: Date
    updatedAt: Date
    _count: RevisionCountAggregateOutputType | null
    _min: RevisionMinAggregateOutputType | null
    _max: RevisionMaxAggregateOutputType | null
  }

  type GetRevisionGroupByPayload<T extends RevisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RevisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RevisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RevisionGroupByOutputType[P]>
            : GetScalarType<T[P], RevisionGroupByOutputType[P]>
        }
      >
    >


  export type RevisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    problemId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["revision"]>

  export type RevisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    problemId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["revision"]>

  export type RevisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    problemId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["revision"]>

  export type RevisionSelectScalar = {
    id?: boolean
    userId?: boolean
    problemId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RevisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "problemId" | "createdAt" | "updatedAt", ExtArgs["result"]["revision"]>
  export type RevisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type RevisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type RevisionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }

  export type $RevisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Revision"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      problem: Prisma.$ProblemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      problemId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["revision"]>
    composites: {}
  }

  type RevisionGetPayload<S extends boolean | null | undefined | RevisionDefaultArgs> = $Result.GetResult<Prisma.$RevisionPayload, S>

  type RevisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RevisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RevisionCountAggregateInputType | true
    }

  export interface RevisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Revision'], meta: { name: 'Revision' } }
    /**
     * Find zero or one Revision that matches the filter.
     * @param {RevisionFindUniqueArgs} args - Arguments to find a Revision
     * @example
     * // Get one Revision
     * const revision = await prisma.revision.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RevisionFindUniqueArgs>(args: SelectSubset<T, RevisionFindUniqueArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Revision that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RevisionFindUniqueOrThrowArgs} args - Arguments to find a Revision
     * @example
     * // Get one Revision
     * const revision = await prisma.revision.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RevisionFindUniqueOrThrowArgs>(args: SelectSubset<T, RevisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Revision that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionFindFirstArgs} args - Arguments to find a Revision
     * @example
     * // Get one Revision
     * const revision = await prisma.revision.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RevisionFindFirstArgs>(args?: SelectSubset<T, RevisionFindFirstArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Revision that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionFindFirstOrThrowArgs} args - Arguments to find a Revision
     * @example
     * // Get one Revision
     * const revision = await prisma.revision.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RevisionFindFirstOrThrowArgs>(args?: SelectSubset<T, RevisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Revisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Revisions
     * const revisions = await prisma.revision.findMany()
     * 
     * // Get first 10 Revisions
     * const revisions = await prisma.revision.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const revisionWithIdOnly = await prisma.revision.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RevisionFindManyArgs>(args?: SelectSubset<T, RevisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Revision.
     * @param {RevisionCreateArgs} args - Arguments to create a Revision.
     * @example
     * // Create one Revision
     * const Revision = await prisma.revision.create({
     *   data: {
     *     // ... data to create a Revision
     *   }
     * })
     * 
     */
    create<T extends RevisionCreateArgs>(args: SelectSubset<T, RevisionCreateArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Revisions.
     * @param {RevisionCreateManyArgs} args - Arguments to create many Revisions.
     * @example
     * // Create many Revisions
     * const revision = await prisma.revision.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RevisionCreateManyArgs>(args?: SelectSubset<T, RevisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Revisions and returns the data saved in the database.
     * @param {RevisionCreateManyAndReturnArgs} args - Arguments to create many Revisions.
     * @example
     * // Create many Revisions
     * const revision = await prisma.revision.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Revisions and only return the `id`
     * const revisionWithIdOnly = await prisma.revision.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RevisionCreateManyAndReturnArgs>(args?: SelectSubset<T, RevisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Revision.
     * @param {RevisionDeleteArgs} args - Arguments to delete one Revision.
     * @example
     * // Delete one Revision
     * const Revision = await prisma.revision.delete({
     *   where: {
     *     // ... filter to delete one Revision
     *   }
     * })
     * 
     */
    delete<T extends RevisionDeleteArgs>(args: SelectSubset<T, RevisionDeleteArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Revision.
     * @param {RevisionUpdateArgs} args - Arguments to update one Revision.
     * @example
     * // Update one Revision
     * const revision = await prisma.revision.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RevisionUpdateArgs>(args: SelectSubset<T, RevisionUpdateArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Revisions.
     * @param {RevisionDeleteManyArgs} args - Arguments to filter Revisions to delete.
     * @example
     * // Delete a few Revisions
     * const { count } = await prisma.revision.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RevisionDeleteManyArgs>(args?: SelectSubset<T, RevisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Revisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Revisions
     * const revision = await prisma.revision.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RevisionUpdateManyArgs>(args: SelectSubset<T, RevisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Revisions and returns the data updated in the database.
     * @param {RevisionUpdateManyAndReturnArgs} args - Arguments to update many Revisions.
     * @example
     * // Update many Revisions
     * const revision = await prisma.revision.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Revisions and only return the `id`
     * const revisionWithIdOnly = await prisma.revision.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RevisionUpdateManyAndReturnArgs>(args: SelectSubset<T, RevisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Revision.
     * @param {RevisionUpsertArgs} args - Arguments to update or create a Revision.
     * @example
     * // Update or create a Revision
     * const revision = await prisma.revision.upsert({
     *   create: {
     *     // ... data to create a Revision
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Revision we want to update
     *   }
     * })
     */
    upsert<T extends RevisionUpsertArgs>(args: SelectSubset<T, RevisionUpsertArgs<ExtArgs>>): Prisma__RevisionClient<$Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Revisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionCountArgs} args - Arguments to filter Revisions to count.
     * @example
     * // Count the number of Revisions
     * const count = await prisma.revision.count({
     *   where: {
     *     // ... the filter for the Revisions we want to count
     *   }
     * })
    **/
    count<T extends RevisionCountArgs>(
      args?: Subset<T, RevisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RevisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Revision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RevisionAggregateArgs>(args: Subset<T, RevisionAggregateArgs>): Prisma.PrismaPromise<GetRevisionAggregateType<T>>

    /**
     * Group by Revision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevisionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RevisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RevisionGroupByArgs['orderBy'] }
        : { orderBy?: RevisionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RevisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRevisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Revision model
   */
  readonly fields: RevisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Revision.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RevisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Revision model
   */
  interface RevisionFieldRefs {
    readonly id: FieldRef<"Revision", 'String'>
    readonly userId: FieldRef<"Revision", 'String'>
    readonly problemId: FieldRef<"Revision", 'String'>
    readonly createdAt: FieldRef<"Revision", 'DateTime'>
    readonly updatedAt: FieldRef<"Revision", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Revision findUnique
   */
  export type RevisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revision to fetch.
     */
    where: RevisionWhereUniqueInput
  }

  /**
   * Revision findUniqueOrThrow
   */
  export type RevisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revision to fetch.
     */
    where: RevisionWhereUniqueInput
  }

  /**
   * Revision findFirst
   */
  export type RevisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revision to fetch.
     */
    where?: RevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revisions to fetch.
     */
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Revisions.
     */
    cursor?: RevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Revisions.
     */
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * Revision findFirstOrThrow
   */
  export type RevisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revision to fetch.
     */
    where?: RevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revisions to fetch.
     */
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Revisions.
     */
    cursor?: RevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Revisions.
     */
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * Revision findMany
   */
  export type RevisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter, which Revisions to fetch.
     */
    where?: RevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revisions to fetch.
     */
    orderBy?: RevisionOrderByWithRelationInput | RevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Revisions.
     */
    cursor?: RevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revisions.
     */
    skip?: number
    distinct?: RevisionScalarFieldEnum | RevisionScalarFieldEnum[]
  }

  /**
   * Revision create
   */
  export type RevisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * The data needed to create a Revision.
     */
    data: XOR<RevisionCreateInput, RevisionUncheckedCreateInput>
  }

  /**
   * Revision createMany
   */
  export type RevisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Revisions.
     */
    data: RevisionCreateManyInput | RevisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Revision createManyAndReturn
   */
  export type RevisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * The data used to create many Revisions.
     */
    data: RevisionCreateManyInput | RevisionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Revision update
   */
  export type RevisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * The data needed to update a Revision.
     */
    data: XOR<RevisionUpdateInput, RevisionUncheckedUpdateInput>
    /**
     * Choose, which Revision to update.
     */
    where: RevisionWhereUniqueInput
  }

  /**
   * Revision updateMany
   */
  export type RevisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Revisions.
     */
    data: XOR<RevisionUpdateManyMutationInput, RevisionUncheckedUpdateManyInput>
    /**
     * Filter which Revisions to update
     */
    where?: RevisionWhereInput
    /**
     * Limit how many Revisions to update.
     */
    limit?: number
  }

  /**
   * Revision updateManyAndReturn
   */
  export type RevisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * The data used to update Revisions.
     */
    data: XOR<RevisionUpdateManyMutationInput, RevisionUncheckedUpdateManyInput>
    /**
     * Filter which Revisions to update
     */
    where?: RevisionWhereInput
    /**
     * Limit how many Revisions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Revision upsert
   */
  export type RevisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * The filter to search for the Revision to update in case it exists.
     */
    where: RevisionWhereUniqueInput
    /**
     * In case the Revision found by the `where` argument doesn't exist, create a new Revision with this data.
     */
    create: XOR<RevisionCreateInput, RevisionUncheckedCreateInput>
    /**
     * In case the Revision was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RevisionUpdateInput, RevisionUncheckedUpdateInput>
  }

  /**
   * Revision delete
   */
  export type RevisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
    /**
     * Filter which Revision to delete.
     */
    where: RevisionWhereUniqueInput
  }

  /**
   * Revision deleteMany
   */
  export type RevisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Revisions to delete
     */
    where?: RevisionWhereInput
    /**
     * Limit how many Revisions to delete.
     */
    limit?: number
  }

  /**
   * Revision without action
   */
  export type RevisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: RevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revision
     */
    omit?: RevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RevisionInclude<ExtArgs> | null
  }


  /**
   * Model Discussion
   */

  export type AggregateDiscussion = {
    _count: DiscussionCountAggregateOutputType | null
    _min: DiscussionMinAggregateOutputType | null
    _max: DiscussionMaxAggregateOutputType | null
  }

  export type DiscussionMinAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    problemId: string | null
    authorId: string | null
    parentId: string | null
  }

  export type DiscussionMaxAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    problemId: string | null
    authorId: string | null
    parentId: string | null
  }

  export type DiscussionCountAggregateOutputType = {
    id: number
    content: number
    createdAt: number
    updatedAt: number
    problemId: number
    authorId: number
    parentId: number
    _all: number
  }


  export type DiscussionMinAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    problemId?: true
    authorId?: true
    parentId?: true
  }

  export type DiscussionMaxAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    problemId?: true
    authorId?: true
    parentId?: true
  }

  export type DiscussionCountAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    problemId?: true
    authorId?: true
    parentId?: true
    _all?: true
  }

  export type DiscussionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Discussion to aggregate.
     */
    where?: DiscussionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Discussions to fetch.
     */
    orderBy?: DiscussionOrderByWithRelationInput | DiscussionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiscussionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Discussions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Discussions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Discussions
    **/
    _count?: true | DiscussionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscussionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscussionMaxAggregateInputType
  }

  export type GetDiscussionAggregateType<T extends DiscussionAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscussion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscussion[P]>
      : GetScalarType<T[P], AggregateDiscussion[P]>
  }




  export type DiscussionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionWhereInput
    orderBy?: DiscussionOrderByWithAggregationInput | DiscussionOrderByWithAggregationInput[]
    by: DiscussionScalarFieldEnum[] | DiscussionScalarFieldEnum
    having?: DiscussionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscussionCountAggregateInputType | true
    _min?: DiscussionMinAggregateInputType
    _max?: DiscussionMaxAggregateInputType
  }

  export type DiscussionGroupByOutputType = {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    problemId: string
    authorId: string
    parentId: string | null
    _count: DiscussionCountAggregateOutputType | null
    _min: DiscussionMinAggregateOutputType | null
    _max: DiscussionMaxAggregateOutputType | null
  }

  type GetDiscussionGroupByPayload<T extends DiscussionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiscussionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiscussionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiscussionGroupByOutputType[P]>
            : GetScalarType<T[P], DiscussionGroupByOutputType[P]>
        }
      >
    >


  export type DiscussionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problemId?: boolean
    authorId?: boolean
    parentId?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Discussion$parentArgs<ExtArgs>
    replies?: boolean | Discussion$repliesArgs<ExtArgs>
    likes?: boolean | Discussion$likesArgs<ExtArgs>
    _count?: boolean | DiscussionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discussion"]>

  export type DiscussionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problemId?: boolean
    authorId?: boolean
    parentId?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Discussion$parentArgs<ExtArgs>
  }, ExtArgs["result"]["discussion"]>

  export type DiscussionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problemId?: boolean
    authorId?: boolean
    parentId?: boolean
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Discussion$parentArgs<ExtArgs>
  }, ExtArgs["result"]["discussion"]>

  export type DiscussionSelectScalar = {
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    problemId?: boolean
    authorId?: boolean
    parentId?: boolean
  }

  export type DiscussionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "createdAt" | "updatedAt" | "problemId" | "authorId" | "parentId", ExtArgs["result"]["discussion"]>
  export type DiscussionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Discussion$parentArgs<ExtArgs>
    replies?: boolean | Discussion$repliesArgs<ExtArgs>
    likes?: boolean | Discussion$likesArgs<ExtArgs>
    _count?: boolean | DiscussionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DiscussionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Discussion$parentArgs<ExtArgs>
  }
  export type DiscussionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Discussion$parentArgs<ExtArgs>
  }

  export type $DiscussionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Discussion"
    objects: {
      problem: Prisma.$ProblemPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
      parent: Prisma.$DiscussionPayload<ExtArgs> | null
      replies: Prisma.$DiscussionPayload<ExtArgs>[]
      likes: Prisma.$DiscussionLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      createdAt: Date
      updatedAt: Date
      problemId: string
      authorId: string
      parentId: string | null
    }, ExtArgs["result"]["discussion"]>
    composites: {}
  }

  type DiscussionGetPayload<S extends boolean | null | undefined | DiscussionDefaultArgs> = $Result.GetResult<Prisma.$DiscussionPayload, S>

  type DiscussionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiscussionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiscussionCountAggregateInputType | true
    }

  export interface DiscussionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Discussion'], meta: { name: 'Discussion' } }
    /**
     * Find zero or one Discussion that matches the filter.
     * @param {DiscussionFindUniqueArgs} args - Arguments to find a Discussion
     * @example
     * // Get one Discussion
     * const discussion = await prisma.discussion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscussionFindUniqueArgs>(args: SelectSubset<T, DiscussionFindUniqueArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Discussion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscussionFindUniqueOrThrowArgs} args - Arguments to find a Discussion
     * @example
     * // Get one Discussion
     * const discussion = await prisma.discussion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscussionFindUniqueOrThrowArgs>(args: SelectSubset<T, DiscussionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Discussion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionFindFirstArgs} args - Arguments to find a Discussion
     * @example
     * // Get one Discussion
     * const discussion = await prisma.discussion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscussionFindFirstArgs>(args?: SelectSubset<T, DiscussionFindFirstArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Discussion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionFindFirstOrThrowArgs} args - Arguments to find a Discussion
     * @example
     * // Get one Discussion
     * const discussion = await prisma.discussion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscussionFindFirstOrThrowArgs>(args?: SelectSubset<T, DiscussionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Discussions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Discussions
     * const discussions = await prisma.discussion.findMany()
     * 
     * // Get first 10 Discussions
     * const discussions = await prisma.discussion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discussionWithIdOnly = await prisma.discussion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiscussionFindManyArgs>(args?: SelectSubset<T, DiscussionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Discussion.
     * @param {DiscussionCreateArgs} args - Arguments to create a Discussion.
     * @example
     * // Create one Discussion
     * const Discussion = await prisma.discussion.create({
     *   data: {
     *     // ... data to create a Discussion
     *   }
     * })
     * 
     */
    create<T extends DiscussionCreateArgs>(args: SelectSubset<T, DiscussionCreateArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Discussions.
     * @param {DiscussionCreateManyArgs} args - Arguments to create many Discussions.
     * @example
     * // Create many Discussions
     * const discussion = await prisma.discussion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiscussionCreateManyArgs>(args?: SelectSubset<T, DiscussionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Discussions and returns the data saved in the database.
     * @param {DiscussionCreateManyAndReturnArgs} args - Arguments to create many Discussions.
     * @example
     * // Create many Discussions
     * const discussion = await prisma.discussion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Discussions and only return the `id`
     * const discussionWithIdOnly = await prisma.discussion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiscussionCreateManyAndReturnArgs>(args?: SelectSubset<T, DiscussionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Discussion.
     * @param {DiscussionDeleteArgs} args - Arguments to delete one Discussion.
     * @example
     * // Delete one Discussion
     * const Discussion = await prisma.discussion.delete({
     *   where: {
     *     // ... filter to delete one Discussion
     *   }
     * })
     * 
     */
    delete<T extends DiscussionDeleteArgs>(args: SelectSubset<T, DiscussionDeleteArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Discussion.
     * @param {DiscussionUpdateArgs} args - Arguments to update one Discussion.
     * @example
     * // Update one Discussion
     * const discussion = await prisma.discussion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiscussionUpdateArgs>(args: SelectSubset<T, DiscussionUpdateArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Discussions.
     * @param {DiscussionDeleteManyArgs} args - Arguments to filter Discussions to delete.
     * @example
     * // Delete a few Discussions
     * const { count } = await prisma.discussion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiscussionDeleteManyArgs>(args?: SelectSubset<T, DiscussionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Discussions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Discussions
     * const discussion = await prisma.discussion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiscussionUpdateManyArgs>(args: SelectSubset<T, DiscussionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Discussions and returns the data updated in the database.
     * @param {DiscussionUpdateManyAndReturnArgs} args - Arguments to update many Discussions.
     * @example
     * // Update many Discussions
     * const discussion = await prisma.discussion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Discussions and only return the `id`
     * const discussionWithIdOnly = await prisma.discussion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DiscussionUpdateManyAndReturnArgs>(args: SelectSubset<T, DiscussionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Discussion.
     * @param {DiscussionUpsertArgs} args - Arguments to update or create a Discussion.
     * @example
     * // Update or create a Discussion
     * const discussion = await prisma.discussion.upsert({
     *   create: {
     *     // ... data to create a Discussion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Discussion we want to update
     *   }
     * })
     */
    upsert<T extends DiscussionUpsertArgs>(args: SelectSubset<T, DiscussionUpsertArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Discussions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionCountArgs} args - Arguments to filter Discussions to count.
     * @example
     * // Count the number of Discussions
     * const count = await prisma.discussion.count({
     *   where: {
     *     // ... the filter for the Discussions we want to count
     *   }
     * })
    **/
    count<T extends DiscussionCountArgs>(
      args?: Subset<T, DiscussionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscussionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Discussion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiscussionAggregateArgs>(args: Subset<T, DiscussionAggregateArgs>): Prisma.PrismaPromise<GetDiscussionAggregateType<T>>

    /**
     * Group by Discussion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiscussionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscussionGroupByArgs['orderBy'] }
        : { orderBy?: DiscussionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiscussionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscussionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Discussion model
   */
  readonly fields: DiscussionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Discussion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiscussionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends Discussion$parentArgs<ExtArgs> = {}>(args?: Subset<T, Discussion$parentArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    replies<T extends Discussion$repliesArgs<ExtArgs> = {}>(args?: Subset<T, Discussion$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Discussion$likesArgs<ExtArgs> = {}>(args?: Subset<T, Discussion$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Discussion model
   */
  interface DiscussionFieldRefs {
    readonly id: FieldRef<"Discussion", 'String'>
    readonly content: FieldRef<"Discussion", 'String'>
    readonly createdAt: FieldRef<"Discussion", 'DateTime'>
    readonly updatedAt: FieldRef<"Discussion", 'DateTime'>
    readonly problemId: FieldRef<"Discussion", 'String'>
    readonly authorId: FieldRef<"Discussion", 'String'>
    readonly parentId: FieldRef<"Discussion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Discussion findUnique
   */
  export type DiscussionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * Filter, which Discussion to fetch.
     */
    where: DiscussionWhereUniqueInput
  }

  /**
   * Discussion findUniqueOrThrow
   */
  export type DiscussionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * Filter, which Discussion to fetch.
     */
    where: DiscussionWhereUniqueInput
  }

  /**
   * Discussion findFirst
   */
  export type DiscussionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * Filter, which Discussion to fetch.
     */
    where?: DiscussionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Discussions to fetch.
     */
    orderBy?: DiscussionOrderByWithRelationInput | DiscussionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Discussions.
     */
    cursor?: DiscussionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Discussions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Discussions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Discussions.
     */
    distinct?: DiscussionScalarFieldEnum | DiscussionScalarFieldEnum[]
  }

  /**
   * Discussion findFirstOrThrow
   */
  export type DiscussionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * Filter, which Discussion to fetch.
     */
    where?: DiscussionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Discussions to fetch.
     */
    orderBy?: DiscussionOrderByWithRelationInput | DiscussionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Discussions.
     */
    cursor?: DiscussionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Discussions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Discussions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Discussions.
     */
    distinct?: DiscussionScalarFieldEnum | DiscussionScalarFieldEnum[]
  }

  /**
   * Discussion findMany
   */
  export type DiscussionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * Filter, which Discussions to fetch.
     */
    where?: DiscussionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Discussions to fetch.
     */
    orderBy?: DiscussionOrderByWithRelationInput | DiscussionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Discussions.
     */
    cursor?: DiscussionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Discussions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Discussions.
     */
    skip?: number
    distinct?: DiscussionScalarFieldEnum | DiscussionScalarFieldEnum[]
  }

  /**
   * Discussion create
   */
  export type DiscussionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * The data needed to create a Discussion.
     */
    data: XOR<DiscussionCreateInput, DiscussionUncheckedCreateInput>
  }

  /**
   * Discussion createMany
   */
  export type DiscussionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Discussions.
     */
    data: DiscussionCreateManyInput | DiscussionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Discussion createManyAndReturn
   */
  export type DiscussionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * The data used to create many Discussions.
     */
    data: DiscussionCreateManyInput | DiscussionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Discussion update
   */
  export type DiscussionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * The data needed to update a Discussion.
     */
    data: XOR<DiscussionUpdateInput, DiscussionUncheckedUpdateInput>
    /**
     * Choose, which Discussion to update.
     */
    where: DiscussionWhereUniqueInput
  }

  /**
   * Discussion updateMany
   */
  export type DiscussionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Discussions.
     */
    data: XOR<DiscussionUpdateManyMutationInput, DiscussionUncheckedUpdateManyInput>
    /**
     * Filter which Discussions to update
     */
    where?: DiscussionWhereInput
    /**
     * Limit how many Discussions to update.
     */
    limit?: number
  }

  /**
   * Discussion updateManyAndReturn
   */
  export type DiscussionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * The data used to update Discussions.
     */
    data: XOR<DiscussionUpdateManyMutationInput, DiscussionUncheckedUpdateManyInput>
    /**
     * Filter which Discussions to update
     */
    where?: DiscussionWhereInput
    /**
     * Limit how many Discussions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Discussion upsert
   */
  export type DiscussionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * The filter to search for the Discussion to update in case it exists.
     */
    where: DiscussionWhereUniqueInput
    /**
     * In case the Discussion found by the `where` argument doesn't exist, create a new Discussion with this data.
     */
    create: XOR<DiscussionCreateInput, DiscussionUncheckedCreateInput>
    /**
     * In case the Discussion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiscussionUpdateInput, DiscussionUncheckedUpdateInput>
  }

  /**
   * Discussion delete
   */
  export type DiscussionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    /**
     * Filter which Discussion to delete.
     */
    where: DiscussionWhereUniqueInput
  }

  /**
   * Discussion deleteMany
   */
  export type DiscussionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Discussions to delete
     */
    where?: DiscussionWhereInput
    /**
     * Limit how many Discussions to delete.
     */
    limit?: number
  }

  /**
   * Discussion.parent
   */
  export type Discussion$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    where?: DiscussionWhereInput
  }

  /**
   * Discussion.replies
   */
  export type Discussion$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
    where?: DiscussionWhereInput
    orderBy?: DiscussionOrderByWithRelationInput | DiscussionOrderByWithRelationInput[]
    cursor?: DiscussionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscussionScalarFieldEnum | DiscussionScalarFieldEnum[]
  }

  /**
   * Discussion.likes
   */
  export type Discussion$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    where?: DiscussionLikeWhereInput
    orderBy?: DiscussionLikeOrderByWithRelationInput | DiscussionLikeOrderByWithRelationInput[]
    cursor?: DiscussionLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscussionLikeScalarFieldEnum | DiscussionLikeScalarFieldEnum[]
  }

  /**
   * Discussion without action
   */
  export type DiscussionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: DiscussionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discussion
     */
    omit?: DiscussionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionInclude<ExtArgs> | null
  }


  /**
   * Model DiscussionLike
   */

  export type AggregateDiscussionLike = {
    _count: DiscussionLikeCountAggregateOutputType | null
    _min: DiscussionLikeMinAggregateOutputType | null
    _max: DiscussionLikeMaxAggregateOutputType | null
  }

  export type DiscussionLikeMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    discussionId: string | null
    userId: string | null
  }

  export type DiscussionLikeMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    discussionId: string | null
    userId: string | null
  }

  export type DiscussionLikeCountAggregateOutputType = {
    id: number
    createdAt: number
    discussionId: number
    userId: number
    _all: number
  }


  export type DiscussionLikeMinAggregateInputType = {
    id?: true
    createdAt?: true
    discussionId?: true
    userId?: true
  }

  export type DiscussionLikeMaxAggregateInputType = {
    id?: true
    createdAt?: true
    discussionId?: true
    userId?: true
  }

  export type DiscussionLikeCountAggregateInputType = {
    id?: true
    createdAt?: true
    discussionId?: true
    userId?: true
    _all?: true
  }

  export type DiscussionLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscussionLike to aggregate.
     */
    where?: DiscussionLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscussionLikes to fetch.
     */
    orderBy?: DiscussionLikeOrderByWithRelationInput | DiscussionLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiscussionLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscussionLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscussionLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiscussionLikes
    **/
    _count?: true | DiscussionLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscussionLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscussionLikeMaxAggregateInputType
  }

  export type GetDiscussionLikeAggregateType<T extends DiscussionLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscussionLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscussionLike[P]>
      : GetScalarType<T[P], AggregateDiscussionLike[P]>
  }




  export type DiscussionLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionLikeWhereInput
    orderBy?: DiscussionLikeOrderByWithAggregationInput | DiscussionLikeOrderByWithAggregationInput[]
    by: DiscussionLikeScalarFieldEnum[] | DiscussionLikeScalarFieldEnum
    having?: DiscussionLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscussionLikeCountAggregateInputType | true
    _min?: DiscussionLikeMinAggregateInputType
    _max?: DiscussionLikeMaxAggregateInputType
  }

  export type DiscussionLikeGroupByOutputType = {
    id: string
    createdAt: Date
    discussionId: string
    userId: string
    _count: DiscussionLikeCountAggregateOutputType | null
    _min: DiscussionLikeMinAggregateOutputType | null
    _max: DiscussionLikeMaxAggregateOutputType | null
  }

  type GetDiscussionLikeGroupByPayload<T extends DiscussionLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiscussionLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiscussionLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiscussionLikeGroupByOutputType[P]>
            : GetScalarType<T[P], DiscussionLikeGroupByOutputType[P]>
        }
      >
    >


  export type DiscussionLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    discussionId?: boolean
    userId?: boolean
    discussion?: boolean | DiscussionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discussionLike"]>

  export type DiscussionLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    discussionId?: boolean
    userId?: boolean
    discussion?: boolean | DiscussionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discussionLike"]>

  export type DiscussionLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    discussionId?: boolean
    userId?: boolean
    discussion?: boolean | DiscussionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discussionLike"]>

  export type DiscussionLikeSelectScalar = {
    id?: boolean
    createdAt?: boolean
    discussionId?: boolean
    userId?: boolean
  }

  export type DiscussionLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "discussionId" | "userId", ExtArgs["result"]["discussionLike"]>
  export type DiscussionLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discussion?: boolean | DiscussionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DiscussionLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discussion?: boolean | DiscussionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DiscussionLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discussion?: boolean | DiscussionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DiscussionLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiscussionLike"
    objects: {
      discussion: Prisma.$DiscussionPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      discussionId: string
      userId: string
    }, ExtArgs["result"]["discussionLike"]>
    composites: {}
  }

  type DiscussionLikeGetPayload<S extends boolean | null | undefined | DiscussionLikeDefaultArgs> = $Result.GetResult<Prisma.$DiscussionLikePayload, S>

  type DiscussionLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiscussionLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiscussionLikeCountAggregateInputType | true
    }

  export interface DiscussionLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiscussionLike'], meta: { name: 'DiscussionLike' } }
    /**
     * Find zero or one DiscussionLike that matches the filter.
     * @param {DiscussionLikeFindUniqueArgs} args - Arguments to find a DiscussionLike
     * @example
     * // Get one DiscussionLike
     * const discussionLike = await prisma.discussionLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscussionLikeFindUniqueArgs>(args: SelectSubset<T, DiscussionLikeFindUniqueArgs<ExtArgs>>): Prisma__DiscussionLikeClient<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DiscussionLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscussionLikeFindUniqueOrThrowArgs} args - Arguments to find a DiscussionLike
     * @example
     * // Get one DiscussionLike
     * const discussionLike = await prisma.discussionLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscussionLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, DiscussionLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiscussionLikeClient<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiscussionLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionLikeFindFirstArgs} args - Arguments to find a DiscussionLike
     * @example
     * // Get one DiscussionLike
     * const discussionLike = await prisma.discussionLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscussionLikeFindFirstArgs>(args?: SelectSubset<T, DiscussionLikeFindFirstArgs<ExtArgs>>): Prisma__DiscussionLikeClient<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiscussionLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionLikeFindFirstOrThrowArgs} args - Arguments to find a DiscussionLike
     * @example
     * // Get one DiscussionLike
     * const discussionLike = await prisma.discussionLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscussionLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, DiscussionLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiscussionLikeClient<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DiscussionLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscussionLikes
     * const discussionLikes = await prisma.discussionLike.findMany()
     * 
     * // Get first 10 DiscussionLikes
     * const discussionLikes = await prisma.discussionLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discussionLikeWithIdOnly = await prisma.discussionLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiscussionLikeFindManyArgs>(args?: SelectSubset<T, DiscussionLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DiscussionLike.
     * @param {DiscussionLikeCreateArgs} args - Arguments to create a DiscussionLike.
     * @example
     * // Create one DiscussionLike
     * const DiscussionLike = await prisma.discussionLike.create({
     *   data: {
     *     // ... data to create a DiscussionLike
     *   }
     * })
     * 
     */
    create<T extends DiscussionLikeCreateArgs>(args: SelectSubset<T, DiscussionLikeCreateArgs<ExtArgs>>): Prisma__DiscussionLikeClient<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DiscussionLikes.
     * @param {DiscussionLikeCreateManyArgs} args - Arguments to create many DiscussionLikes.
     * @example
     * // Create many DiscussionLikes
     * const discussionLike = await prisma.discussionLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiscussionLikeCreateManyArgs>(args?: SelectSubset<T, DiscussionLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiscussionLikes and returns the data saved in the database.
     * @param {DiscussionLikeCreateManyAndReturnArgs} args - Arguments to create many DiscussionLikes.
     * @example
     * // Create many DiscussionLikes
     * const discussionLike = await prisma.discussionLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiscussionLikes and only return the `id`
     * const discussionLikeWithIdOnly = await prisma.discussionLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiscussionLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, DiscussionLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DiscussionLike.
     * @param {DiscussionLikeDeleteArgs} args - Arguments to delete one DiscussionLike.
     * @example
     * // Delete one DiscussionLike
     * const DiscussionLike = await prisma.discussionLike.delete({
     *   where: {
     *     // ... filter to delete one DiscussionLike
     *   }
     * })
     * 
     */
    delete<T extends DiscussionLikeDeleteArgs>(args: SelectSubset<T, DiscussionLikeDeleteArgs<ExtArgs>>): Prisma__DiscussionLikeClient<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DiscussionLike.
     * @param {DiscussionLikeUpdateArgs} args - Arguments to update one DiscussionLike.
     * @example
     * // Update one DiscussionLike
     * const discussionLike = await prisma.discussionLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiscussionLikeUpdateArgs>(args: SelectSubset<T, DiscussionLikeUpdateArgs<ExtArgs>>): Prisma__DiscussionLikeClient<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DiscussionLikes.
     * @param {DiscussionLikeDeleteManyArgs} args - Arguments to filter DiscussionLikes to delete.
     * @example
     * // Delete a few DiscussionLikes
     * const { count } = await prisma.discussionLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiscussionLikeDeleteManyArgs>(args?: SelectSubset<T, DiscussionLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscussionLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscussionLikes
     * const discussionLike = await prisma.discussionLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiscussionLikeUpdateManyArgs>(args: SelectSubset<T, DiscussionLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscussionLikes and returns the data updated in the database.
     * @param {DiscussionLikeUpdateManyAndReturnArgs} args - Arguments to update many DiscussionLikes.
     * @example
     * // Update many DiscussionLikes
     * const discussionLike = await prisma.discussionLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DiscussionLikes and only return the `id`
     * const discussionLikeWithIdOnly = await prisma.discussionLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DiscussionLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, DiscussionLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DiscussionLike.
     * @param {DiscussionLikeUpsertArgs} args - Arguments to update or create a DiscussionLike.
     * @example
     * // Update or create a DiscussionLike
     * const discussionLike = await prisma.discussionLike.upsert({
     *   create: {
     *     // ... data to create a DiscussionLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscussionLike we want to update
     *   }
     * })
     */
    upsert<T extends DiscussionLikeUpsertArgs>(args: SelectSubset<T, DiscussionLikeUpsertArgs<ExtArgs>>): Prisma__DiscussionLikeClient<$Result.GetResult<Prisma.$DiscussionLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DiscussionLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionLikeCountArgs} args - Arguments to filter DiscussionLikes to count.
     * @example
     * // Count the number of DiscussionLikes
     * const count = await prisma.discussionLike.count({
     *   where: {
     *     // ... the filter for the DiscussionLikes we want to count
     *   }
     * })
    **/
    count<T extends DiscussionLikeCountArgs>(
      args?: Subset<T, DiscussionLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscussionLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiscussionLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiscussionLikeAggregateArgs>(args: Subset<T, DiscussionLikeAggregateArgs>): Prisma.PrismaPromise<GetDiscussionLikeAggregateType<T>>

    /**
     * Group by DiscussionLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiscussionLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscussionLikeGroupByArgs['orderBy'] }
        : { orderBy?: DiscussionLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiscussionLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscussionLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiscussionLike model
   */
  readonly fields: DiscussionLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiscussionLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiscussionLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    discussion<T extends DiscussionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DiscussionDefaultArgs<ExtArgs>>): Prisma__DiscussionClient<$Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DiscussionLike model
   */
  interface DiscussionLikeFieldRefs {
    readonly id: FieldRef<"DiscussionLike", 'String'>
    readonly createdAt: FieldRef<"DiscussionLike", 'DateTime'>
    readonly discussionId: FieldRef<"DiscussionLike", 'String'>
    readonly userId: FieldRef<"DiscussionLike", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DiscussionLike findUnique
   */
  export type DiscussionLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionLike to fetch.
     */
    where: DiscussionLikeWhereUniqueInput
  }

  /**
   * DiscussionLike findUniqueOrThrow
   */
  export type DiscussionLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionLike to fetch.
     */
    where: DiscussionLikeWhereUniqueInput
  }

  /**
   * DiscussionLike findFirst
   */
  export type DiscussionLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionLike to fetch.
     */
    where?: DiscussionLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscussionLikes to fetch.
     */
    orderBy?: DiscussionLikeOrderByWithRelationInput | DiscussionLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscussionLikes.
     */
    cursor?: DiscussionLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscussionLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscussionLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscussionLikes.
     */
    distinct?: DiscussionLikeScalarFieldEnum | DiscussionLikeScalarFieldEnum[]
  }

  /**
   * DiscussionLike findFirstOrThrow
   */
  export type DiscussionLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionLike to fetch.
     */
    where?: DiscussionLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscussionLikes to fetch.
     */
    orderBy?: DiscussionLikeOrderByWithRelationInput | DiscussionLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscussionLikes.
     */
    cursor?: DiscussionLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscussionLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscussionLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscussionLikes.
     */
    distinct?: DiscussionLikeScalarFieldEnum | DiscussionLikeScalarFieldEnum[]
  }

  /**
   * DiscussionLike findMany
   */
  export type DiscussionLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionLikes to fetch.
     */
    where?: DiscussionLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscussionLikes to fetch.
     */
    orderBy?: DiscussionLikeOrderByWithRelationInput | DiscussionLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiscussionLikes.
     */
    cursor?: DiscussionLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscussionLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscussionLikes.
     */
    skip?: number
    distinct?: DiscussionLikeScalarFieldEnum | DiscussionLikeScalarFieldEnum[]
  }

  /**
   * DiscussionLike create
   */
  export type DiscussionLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a DiscussionLike.
     */
    data: XOR<DiscussionLikeCreateInput, DiscussionLikeUncheckedCreateInput>
  }

  /**
   * DiscussionLike createMany
   */
  export type DiscussionLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscussionLikes.
     */
    data: DiscussionLikeCreateManyInput | DiscussionLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiscussionLike createManyAndReturn
   */
  export type DiscussionLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * The data used to create many DiscussionLikes.
     */
    data: DiscussionLikeCreateManyInput | DiscussionLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscussionLike update
   */
  export type DiscussionLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a DiscussionLike.
     */
    data: XOR<DiscussionLikeUpdateInput, DiscussionLikeUncheckedUpdateInput>
    /**
     * Choose, which DiscussionLike to update.
     */
    where: DiscussionLikeWhereUniqueInput
  }

  /**
   * DiscussionLike updateMany
   */
  export type DiscussionLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscussionLikes.
     */
    data: XOR<DiscussionLikeUpdateManyMutationInput, DiscussionLikeUncheckedUpdateManyInput>
    /**
     * Filter which DiscussionLikes to update
     */
    where?: DiscussionLikeWhereInput
    /**
     * Limit how many DiscussionLikes to update.
     */
    limit?: number
  }

  /**
   * DiscussionLike updateManyAndReturn
   */
  export type DiscussionLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * The data used to update DiscussionLikes.
     */
    data: XOR<DiscussionLikeUpdateManyMutationInput, DiscussionLikeUncheckedUpdateManyInput>
    /**
     * Filter which DiscussionLikes to update
     */
    where?: DiscussionLikeWhereInput
    /**
     * Limit how many DiscussionLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscussionLike upsert
   */
  export type DiscussionLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the DiscussionLike to update in case it exists.
     */
    where: DiscussionLikeWhereUniqueInput
    /**
     * In case the DiscussionLike found by the `where` argument doesn't exist, create a new DiscussionLike with this data.
     */
    create: XOR<DiscussionLikeCreateInput, DiscussionLikeUncheckedCreateInput>
    /**
     * In case the DiscussionLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiscussionLikeUpdateInput, DiscussionLikeUncheckedUpdateInput>
  }

  /**
   * DiscussionLike delete
   */
  export type DiscussionLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
    /**
     * Filter which DiscussionLike to delete.
     */
    where: DiscussionLikeWhereUniqueInput
  }

  /**
   * DiscussionLike deleteMany
   */
  export type DiscussionLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscussionLikes to delete
     */
    where?: DiscussionLikeWhereInput
    /**
     * Limit how many DiscussionLikes to delete.
     */
    limit?: number
  }

  /**
   * DiscussionLike without action
   */
  export type DiscussionLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionLike
     */
    select?: DiscussionLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionLike
     */
    omit?: DiscussionLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionLikeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    image: 'image',
    role: 'role',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLogin: 'lastLogin',
    streakCount: 'streakCount',
    maxStreakCount: 'maxStreakCount',
    firebaseUid: 'firebaseUid',
    authProvider: 'authProvider',
    gender: 'gender',
    dateOfBirth: 'dateOfBirth',
    bio: 'bio',
    githubProfile: 'githubProfile',
    linkedinProfile: 'linkedinProfile'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProblemScalarFieldEnum: {
    id: 'id',
    leetcodeId: 'leetcodeId',
    title: 'title',
    description: 'description',
    difficulty: 'difficulty',
    isPremium: 'isPremium',
    solutionLink: 'solutionLink',
    acceptanceRate: 'acceptanceRate',
    frequency: 'frequency',
    url: 'url',
    discussCount: 'discussCount',
    accepted: 'accepted',
    submissions: 'submissions',
    companies: 'companies',
    relatedTopics: 'relatedTopics',
    likes: 'likes',
    dislikes: 'dislikes',
    rating: 'rating',
    askedByFaang: 'askedByFaang',
    similarQuestions: 'similarQuestions',
    tags: 'tags',
    companyTags: 'companyTags',
    userId: 'userId',
    examples: 'examples',
    constraints: 'constraints',
    hints: 'hints',
    editorial: 'editorial',
    testcases: 'testcases',
    codeSnippets: 'codeSnippets',
    referenceSolutions: 'referenceSolutions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProblemScalarFieldEnum = (typeof ProblemScalarFieldEnum)[keyof typeof ProblemScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    problemId: 'problemId',
    userId: 'userId',
    sourceCode: 'sourceCode',
    language: 'language',
    stdin: 'stdin',
    stdout: 'stdout',
    stderr: 'stderr',
    compileOutput: 'compileOutput',
    status: 'status',
    memory: 'memory',
    time: 'time',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const TestCaseResultScalarFieldEnum: {
    id: 'id',
    submissionId: 'submissionId',
    testCase: 'testCase',
    passed: 'passed',
    stdout: 'stdout',
    expected: 'expected',
    stderr: 'stderr',
    compileOutput: 'compileOutput',
    status: 'status',
    memory: 'memory',
    time: 'time',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TestCaseResultScalarFieldEnum = (typeof TestCaseResultScalarFieldEnum)[keyof typeof TestCaseResultScalarFieldEnum]


  export const ProblemSolvedScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    problemId: 'problemId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProblemSolvedScalarFieldEnum = (typeof ProblemSolvedScalarFieldEnum)[keyof typeof ProblemSolvedScalarFieldEnum]


  export const PlaylistScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type PlaylistScalarFieldEnum = (typeof PlaylistScalarFieldEnum)[keyof typeof PlaylistScalarFieldEnum]


  export const ProblemPlaylistScalarFieldEnum: {
    id: 'id',
    problemId: 'problemId',
    playlistId: 'playlistId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProblemPlaylistScalarFieldEnum = (typeof ProblemPlaylistScalarFieldEnum)[keyof typeof ProblemPlaylistScalarFieldEnum]


  export const RevisionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    problemId: 'problemId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RevisionScalarFieldEnum = (typeof RevisionScalarFieldEnum)[keyof typeof RevisionScalarFieldEnum]


  export const DiscussionScalarFieldEnum: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    problemId: 'problemId',
    authorId: 'authorId',
    parentId: 'parentId'
  };

  export type DiscussionScalarFieldEnum = (typeof DiscussionScalarFieldEnum)[keyof typeof DiscussionScalarFieldEnum]


  export const DiscussionLikeScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    discussionId: 'discussionId',
    userId: 'userId'
  };

  export type DiscussionLikeScalarFieldEnum = (typeof DiscussionLikeScalarFieldEnum)[keyof typeof DiscussionLikeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Difficulty'
   */
  export type EnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty'>
    


  /**
   * Reference to a field of type 'Difficulty[]'
   */
  export type ListEnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    streakCount?: IntFilter<"User"> | number
    maxStreakCount?: IntFilter<"User"> | number
    firebaseUid?: StringNullableFilter<"User"> | string | null
    authProvider?: StringNullableFilter<"User"> | string | null
    gender?: EnumGenderNullableFilter<"User"> | $Enums.Gender | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    bio?: StringNullableFilter<"User"> | string | null
    githubProfile?: StringNullableFilter<"User"> | string | null
    linkedinProfile?: StringNullableFilter<"User"> | string | null
    problems?: ProblemListRelationFilter
    submissions?: SubmissionListRelationFilter
    solvedProblems?: ProblemSolvedListRelationFilter
    Playlists?: PlaylistListRelationFilter
    discussions?: DiscussionListRelationFilter
    discussionLikes?: DiscussionLikeListRelationFilter
    Revision?: RevisionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    streakCount?: SortOrder
    maxStreakCount?: SortOrder
    firebaseUid?: SortOrderInput | SortOrder
    authProvider?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    githubProfile?: SortOrderInput | SortOrder
    linkedinProfile?: SortOrderInput | SortOrder
    problems?: ProblemOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
    solvedProblems?: ProblemSolvedOrderByRelationAggregateInput
    Playlists?: PlaylistOrderByRelationAggregateInput
    discussions?: DiscussionOrderByRelationAggregateInput
    discussionLikes?: DiscussionLikeOrderByRelationAggregateInput
    Revision?: RevisionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    firebaseUid?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    streakCount?: IntFilter<"User"> | number
    maxStreakCount?: IntFilter<"User"> | number
    authProvider?: StringNullableFilter<"User"> | string | null
    gender?: EnumGenderNullableFilter<"User"> | $Enums.Gender | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    bio?: StringNullableFilter<"User"> | string | null
    githubProfile?: StringNullableFilter<"User"> | string | null
    linkedinProfile?: StringNullableFilter<"User"> | string | null
    problems?: ProblemListRelationFilter
    submissions?: SubmissionListRelationFilter
    solvedProblems?: ProblemSolvedListRelationFilter
    Playlists?: PlaylistListRelationFilter
    discussions?: DiscussionListRelationFilter
    discussionLikes?: DiscussionLikeListRelationFilter
    Revision?: RevisionListRelationFilter
  }, "id" | "email" | "firebaseUid">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    streakCount?: SortOrder
    maxStreakCount?: SortOrder
    firebaseUid?: SortOrderInput | SortOrder
    authProvider?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    githubProfile?: SortOrderInput | SortOrder
    linkedinProfile?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    streakCount?: IntWithAggregatesFilter<"User"> | number
    maxStreakCount?: IntWithAggregatesFilter<"User"> | number
    firebaseUid?: StringNullableWithAggregatesFilter<"User"> | string | null
    authProvider?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"User"> | $Enums.Gender | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    githubProfile?: StringNullableWithAggregatesFilter<"User"> | string | null
    linkedinProfile?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type ProblemWhereInput = {
    AND?: ProblemWhereInput | ProblemWhereInput[]
    OR?: ProblemWhereInput[]
    NOT?: ProblemWhereInput | ProblemWhereInput[]
    id?: StringFilter<"Problem"> | string
    leetcodeId?: IntNullableFilter<"Problem"> | number | null
    title?: StringFilter<"Problem"> | string
    description?: StringFilter<"Problem"> | string
    difficulty?: EnumDifficultyFilter<"Problem"> | $Enums.Difficulty
    isPremium?: BoolFilter<"Problem"> | boolean
    solutionLink?: StringNullableFilter<"Problem"> | string | null
    acceptanceRate?: FloatNullableFilter<"Problem"> | number | null
    frequency?: FloatNullableFilter<"Problem"> | number | null
    url?: StringNullableFilter<"Problem"> | string | null
    discussCount?: IntNullableFilter<"Problem"> | number | null
    accepted?: IntNullableFilter<"Problem"> | number | null
    submissions?: IntNullableFilter<"Problem"> | number | null
    companies?: StringNullableListFilter<"Problem">
    relatedTopics?: StringNullableListFilter<"Problem">
    likes?: IntNullableFilter<"Problem"> | number | null
    dislikes?: IntNullableFilter<"Problem"> | number | null
    rating?: FloatNullableFilter<"Problem"> | number | null
    askedByFaang?: BoolFilter<"Problem"> | boolean
    similarQuestions?: StringNullableFilter<"Problem"> | string | null
    tags?: StringNullableListFilter<"Problem">
    companyTags?: StringNullableListFilter<"Problem">
    userId?: StringNullableFilter<"Problem"> | string | null
    examples?: JsonNullableFilter<"Problem">
    constraints?: StringNullableFilter<"Problem"> | string | null
    hints?: StringNullableFilter<"Problem"> | string | null
    editorial?: StringNullableFilter<"Problem"> | string | null
    testcases?: JsonNullableFilter<"Problem">
    codeSnippets?: JsonNullableFilter<"Problem">
    referenceSolutions?: JsonNullableFilter<"Problem">
    createdAt?: DateTimeFilter<"Problem"> | Date | string
    updatedAt?: DateTimeFilter<"Problem"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    submission?: SubmissionListRelationFilter
    solvedBy?: ProblemSolvedListRelationFilter
    problemsPlaylist?: ProblemPlaylistListRelationFilter
    discussions?: DiscussionListRelationFilter
    Revision?: RevisionListRelationFilter
  }

  export type ProblemOrderByWithRelationInput = {
    id?: SortOrder
    leetcodeId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    isPremium?: SortOrder
    solutionLink?: SortOrderInput | SortOrder
    acceptanceRate?: SortOrderInput | SortOrder
    frequency?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    discussCount?: SortOrderInput | SortOrder
    accepted?: SortOrderInput | SortOrder
    submissions?: SortOrderInput | SortOrder
    companies?: SortOrder
    relatedTopics?: SortOrder
    likes?: SortOrderInput | SortOrder
    dislikes?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    askedByFaang?: SortOrder
    similarQuestions?: SortOrderInput | SortOrder
    tags?: SortOrder
    companyTags?: SortOrder
    userId?: SortOrderInput | SortOrder
    examples?: SortOrderInput | SortOrder
    constraints?: SortOrderInput | SortOrder
    hints?: SortOrderInput | SortOrder
    editorial?: SortOrderInput | SortOrder
    testcases?: SortOrderInput | SortOrder
    codeSnippets?: SortOrderInput | SortOrder
    referenceSolutions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    submission?: SubmissionOrderByRelationAggregateInput
    solvedBy?: ProblemSolvedOrderByRelationAggregateInput
    problemsPlaylist?: ProblemPlaylistOrderByRelationAggregateInput
    discussions?: DiscussionOrderByRelationAggregateInput
    Revision?: RevisionOrderByRelationAggregateInput
  }

  export type ProblemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    leetcodeId?: number
    AND?: ProblemWhereInput | ProblemWhereInput[]
    OR?: ProblemWhereInput[]
    NOT?: ProblemWhereInput | ProblemWhereInput[]
    title?: StringFilter<"Problem"> | string
    description?: StringFilter<"Problem"> | string
    difficulty?: EnumDifficultyFilter<"Problem"> | $Enums.Difficulty
    isPremium?: BoolFilter<"Problem"> | boolean
    solutionLink?: StringNullableFilter<"Problem"> | string | null
    acceptanceRate?: FloatNullableFilter<"Problem"> | number | null
    frequency?: FloatNullableFilter<"Problem"> | number | null
    url?: StringNullableFilter<"Problem"> | string | null
    discussCount?: IntNullableFilter<"Problem"> | number | null
    accepted?: IntNullableFilter<"Problem"> | number | null
    submissions?: IntNullableFilter<"Problem"> | number | null
    companies?: StringNullableListFilter<"Problem">
    relatedTopics?: StringNullableListFilter<"Problem">
    likes?: IntNullableFilter<"Problem"> | number | null
    dislikes?: IntNullableFilter<"Problem"> | number | null
    rating?: FloatNullableFilter<"Problem"> | number | null
    askedByFaang?: BoolFilter<"Problem"> | boolean
    similarQuestions?: StringNullableFilter<"Problem"> | string | null
    tags?: StringNullableListFilter<"Problem">
    companyTags?: StringNullableListFilter<"Problem">
    userId?: StringNullableFilter<"Problem"> | string | null
    examples?: JsonNullableFilter<"Problem">
    constraints?: StringNullableFilter<"Problem"> | string | null
    hints?: StringNullableFilter<"Problem"> | string | null
    editorial?: StringNullableFilter<"Problem"> | string | null
    testcases?: JsonNullableFilter<"Problem">
    codeSnippets?: JsonNullableFilter<"Problem">
    referenceSolutions?: JsonNullableFilter<"Problem">
    createdAt?: DateTimeFilter<"Problem"> | Date | string
    updatedAt?: DateTimeFilter<"Problem"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    submission?: SubmissionListRelationFilter
    solvedBy?: ProblemSolvedListRelationFilter
    problemsPlaylist?: ProblemPlaylistListRelationFilter
    discussions?: DiscussionListRelationFilter
    Revision?: RevisionListRelationFilter
  }, "id" | "leetcodeId">

  export type ProblemOrderByWithAggregationInput = {
    id?: SortOrder
    leetcodeId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    isPremium?: SortOrder
    solutionLink?: SortOrderInput | SortOrder
    acceptanceRate?: SortOrderInput | SortOrder
    frequency?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    discussCount?: SortOrderInput | SortOrder
    accepted?: SortOrderInput | SortOrder
    submissions?: SortOrderInput | SortOrder
    companies?: SortOrder
    relatedTopics?: SortOrder
    likes?: SortOrderInput | SortOrder
    dislikes?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    askedByFaang?: SortOrder
    similarQuestions?: SortOrderInput | SortOrder
    tags?: SortOrder
    companyTags?: SortOrder
    userId?: SortOrderInput | SortOrder
    examples?: SortOrderInput | SortOrder
    constraints?: SortOrderInput | SortOrder
    hints?: SortOrderInput | SortOrder
    editorial?: SortOrderInput | SortOrder
    testcases?: SortOrderInput | SortOrder
    codeSnippets?: SortOrderInput | SortOrder
    referenceSolutions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProblemCountOrderByAggregateInput
    _avg?: ProblemAvgOrderByAggregateInput
    _max?: ProblemMaxOrderByAggregateInput
    _min?: ProblemMinOrderByAggregateInput
    _sum?: ProblemSumOrderByAggregateInput
  }

  export type ProblemScalarWhereWithAggregatesInput = {
    AND?: ProblemScalarWhereWithAggregatesInput | ProblemScalarWhereWithAggregatesInput[]
    OR?: ProblemScalarWhereWithAggregatesInput[]
    NOT?: ProblemScalarWhereWithAggregatesInput | ProblemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Problem"> | string
    leetcodeId?: IntNullableWithAggregatesFilter<"Problem"> | number | null
    title?: StringWithAggregatesFilter<"Problem"> | string
    description?: StringWithAggregatesFilter<"Problem"> | string
    difficulty?: EnumDifficultyWithAggregatesFilter<"Problem"> | $Enums.Difficulty
    isPremium?: BoolWithAggregatesFilter<"Problem"> | boolean
    solutionLink?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    acceptanceRate?: FloatNullableWithAggregatesFilter<"Problem"> | number | null
    frequency?: FloatNullableWithAggregatesFilter<"Problem"> | number | null
    url?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    discussCount?: IntNullableWithAggregatesFilter<"Problem"> | number | null
    accepted?: IntNullableWithAggregatesFilter<"Problem"> | number | null
    submissions?: IntNullableWithAggregatesFilter<"Problem"> | number | null
    companies?: StringNullableListFilter<"Problem">
    relatedTopics?: StringNullableListFilter<"Problem">
    likes?: IntNullableWithAggregatesFilter<"Problem"> | number | null
    dislikes?: IntNullableWithAggregatesFilter<"Problem"> | number | null
    rating?: FloatNullableWithAggregatesFilter<"Problem"> | number | null
    askedByFaang?: BoolWithAggregatesFilter<"Problem"> | boolean
    similarQuestions?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    tags?: StringNullableListFilter<"Problem">
    companyTags?: StringNullableListFilter<"Problem">
    userId?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    examples?: JsonNullableWithAggregatesFilter<"Problem">
    constraints?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    hints?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    editorial?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    testcases?: JsonNullableWithAggregatesFilter<"Problem">
    codeSnippets?: JsonNullableWithAggregatesFilter<"Problem">
    referenceSolutions?: JsonNullableWithAggregatesFilter<"Problem">
    createdAt?: DateTimeWithAggregatesFilter<"Problem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Problem"> | Date | string
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: StringFilter<"Submission"> | string
    problemId?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    sourceCode?: JsonFilter<"Submission">
    language?: StringFilter<"Submission"> | string
    stdin?: StringNullableFilter<"Submission"> | string | null
    stdout?: StringNullableFilter<"Submission"> | string | null
    stderr?: StringNullableFilter<"Submission"> | string | null
    compileOutput?: StringNullableFilter<"Submission"> | string | null
    status?: StringFilter<"Submission"> | string
    memory?: StringNullableFilter<"Submission"> | string | null
    time?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    testCases?: TestCaseResultListRelationFilter
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    problemId?: SortOrder
    userId?: SortOrder
    sourceCode?: SortOrder
    language?: SortOrder
    stdin?: SortOrderInput | SortOrder
    stdout?: SortOrderInput | SortOrder
    stderr?: SortOrderInput | SortOrder
    compileOutput?: SortOrderInput | SortOrder
    status?: SortOrder
    memory?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    problem?: ProblemOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    testCases?: TestCaseResultOrderByRelationAggregateInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    problemId?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    sourceCode?: JsonFilter<"Submission">
    language?: StringFilter<"Submission"> | string
    stdin?: StringNullableFilter<"Submission"> | string | null
    stdout?: StringNullableFilter<"Submission"> | string | null
    stderr?: StringNullableFilter<"Submission"> | string | null
    compileOutput?: StringNullableFilter<"Submission"> | string | null
    status?: StringFilter<"Submission"> | string
    memory?: StringNullableFilter<"Submission"> | string | null
    time?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    testCases?: TestCaseResultListRelationFilter
  }, "id">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    problemId?: SortOrder
    userId?: SortOrder
    sourceCode?: SortOrder
    language?: SortOrder
    stdin?: SortOrderInput | SortOrder
    stdout?: SortOrderInput | SortOrder
    stderr?: SortOrderInput | SortOrder
    compileOutput?: SortOrderInput | SortOrder
    status?: SortOrder
    memory?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Submission"> | string
    problemId?: StringWithAggregatesFilter<"Submission"> | string
    userId?: StringWithAggregatesFilter<"Submission"> | string
    sourceCode?: JsonWithAggregatesFilter<"Submission">
    language?: StringWithAggregatesFilter<"Submission"> | string
    stdin?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    stdout?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    stderr?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    compileOutput?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    status?: StringWithAggregatesFilter<"Submission"> | string
    memory?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    time?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
  }

  export type TestCaseResultWhereInput = {
    AND?: TestCaseResultWhereInput | TestCaseResultWhereInput[]
    OR?: TestCaseResultWhereInput[]
    NOT?: TestCaseResultWhereInput | TestCaseResultWhereInput[]
    id?: StringFilter<"TestCaseResult"> | string
    submissionId?: StringFilter<"TestCaseResult"> | string
    testCase?: IntFilter<"TestCaseResult"> | number
    passed?: BoolFilter<"TestCaseResult"> | boolean
    stdout?: StringNullableFilter<"TestCaseResult"> | string | null
    expected?: StringNullableFilter<"TestCaseResult"> | string | null
    stderr?: StringNullableFilter<"TestCaseResult"> | string | null
    compileOutput?: StringNullableFilter<"TestCaseResult"> | string | null
    status?: StringFilter<"TestCaseResult"> | string
    memory?: StringNullableFilter<"TestCaseResult"> | string | null
    time?: StringNullableFilter<"TestCaseResult"> | string | null
    createdAt?: DateTimeFilter<"TestCaseResult"> | Date | string
    updatedAt?: DateTimeFilter<"TestCaseResult"> | Date | string
    submission?: XOR<SubmissionScalarRelationFilter, SubmissionWhereInput>
  }

  export type TestCaseResultOrderByWithRelationInput = {
    id?: SortOrder
    submissionId?: SortOrder
    testCase?: SortOrder
    passed?: SortOrder
    stdout?: SortOrderInput | SortOrder
    expected?: SortOrderInput | SortOrder
    stderr?: SortOrderInput | SortOrder
    compileOutput?: SortOrderInput | SortOrder
    status?: SortOrder
    memory?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submission?: SubmissionOrderByWithRelationInput
  }

  export type TestCaseResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestCaseResultWhereInput | TestCaseResultWhereInput[]
    OR?: TestCaseResultWhereInput[]
    NOT?: TestCaseResultWhereInput | TestCaseResultWhereInput[]
    submissionId?: StringFilter<"TestCaseResult"> | string
    testCase?: IntFilter<"TestCaseResult"> | number
    passed?: BoolFilter<"TestCaseResult"> | boolean
    stdout?: StringNullableFilter<"TestCaseResult"> | string | null
    expected?: StringNullableFilter<"TestCaseResult"> | string | null
    stderr?: StringNullableFilter<"TestCaseResult"> | string | null
    compileOutput?: StringNullableFilter<"TestCaseResult"> | string | null
    status?: StringFilter<"TestCaseResult"> | string
    memory?: StringNullableFilter<"TestCaseResult"> | string | null
    time?: StringNullableFilter<"TestCaseResult"> | string | null
    createdAt?: DateTimeFilter<"TestCaseResult"> | Date | string
    updatedAt?: DateTimeFilter<"TestCaseResult"> | Date | string
    submission?: XOR<SubmissionScalarRelationFilter, SubmissionWhereInput>
  }, "id">

  export type TestCaseResultOrderByWithAggregationInput = {
    id?: SortOrder
    submissionId?: SortOrder
    testCase?: SortOrder
    passed?: SortOrder
    stdout?: SortOrderInput | SortOrder
    expected?: SortOrderInput | SortOrder
    stderr?: SortOrderInput | SortOrder
    compileOutput?: SortOrderInput | SortOrder
    status?: SortOrder
    memory?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TestCaseResultCountOrderByAggregateInput
    _avg?: TestCaseResultAvgOrderByAggregateInput
    _max?: TestCaseResultMaxOrderByAggregateInput
    _min?: TestCaseResultMinOrderByAggregateInput
    _sum?: TestCaseResultSumOrderByAggregateInput
  }

  export type TestCaseResultScalarWhereWithAggregatesInput = {
    AND?: TestCaseResultScalarWhereWithAggregatesInput | TestCaseResultScalarWhereWithAggregatesInput[]
    OR?: TestCaseResultScalarWhereWithAggregatesInput[]
    NOT?: TestCaseResultScalarWhereWithAggregatesInput | TestCaseResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestCaseResult"> | string
    submissionId?: StringWithAggregatesFilter<"TestCaseResult"> | string
    testCase?: IntWithAggregatesFilter<"TestCaseResult"> | number
    passed?: BoolWithAggregatesFilter<"TestCaseResult"> | boolean
    stdout?: StringNullableWithAggregatesFilter<"TestCaseResult"> | string | null
    expected?: StringNullableWithAggregatesFilter<"TestCaseResult"> | string | null
    stderr?: StringNullableWithAggregatesFilter<"TestCaseResult"> | string | null
    compileOutput?: StringNullableWithAggregatesFilter<"TestCaseResult"> | string | null
    status?: StringWithAggregatesFilter<"TestCaseResult"> | string
    memory?: StringNullableWithAggregatesFilter<"TestCaseResult"> | string | null
    time?: StringNullableWithAggregatesFilter<"TestCaseResult"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TestCaseResult"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TestCaseResult"> | Date | string
  }

  export type ProblemSolvedWhereInput = {
    AND?: ProblemSolvedWhereInput | ProblemSolvedWhereInput[]
    OR?: ProblemSolvedWhereInput[]
    NOT?: ProblemSolvedWhereInput | ProblemSolvedWhereInput[]
    id?: StringFilter<"ProblemSolved"> | string
    userId?: StringFilter<"ProblemSolved"> | string
    problemId?: StringFilter<"ProblemSolved"> | string
    createdAt?: DateTimeFilter<"ProblemSolved"> | Date | string
    updatedAt?: DateTimeFilter<"ProblemSolved"> | Date | string
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProblemSolvedOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    problem?: ProblemOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ProblemSolvedWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_problemId?: ProblemSolvedUserIdProblemIdCompoundUniqueInput
    AND?: ProblemSolvedWhereInput | ProblemSolvedWhereInput[]
    OR?: ProblemSolvedWhereInput[]
    NOT?: ProblemSolvedWhereInput | ProblemSolvedWhereInput[]
    userId?: StringFilter<"ProblemSolved"> | string
    problemId?: StringFilter<"ProblemSolved"> | string
    createdAt?: DateTimeFilter<"ProblemSolved"> | Date | string
    updatedAt?: DateTimeFilter<"ProblemSolved"> | Date | string
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_problemId">

  export type ProblemSolvedOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProblemSolvedCountOrderByAggregateInput
    _max?: ProblemSolvedMaxOrderByAggregateInput
    _min?: ProblemSolvedMinOrderByAggregateInput
  }

  export type ProblemSolvedScalarWhereWithAggregatesInput = {
    AND?: ProblemSolvedScalarWhereWithAggregatesInput | ProblemSolvedScalarWhereWithAggregatesInput[]
    OR?: ProblemSolvedScalarWhereWithAggregatesInput[]
    NOT?: ProblemSolvedScalarWhereWithAggregatesInput | ProblemSolvedScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProblemSolved"> | string
    userId?: StringWithAggregatesFilter<"ProblemSolved"> | string
    problemId?: StringWithAggregatesFilter<"ProblemSolved"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProblemSolved"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProblemSolved"> | Date | string
  }

  export type PlaylistWhereInput = {
    AND?: PlaylistWhereInput | PlaylistWhereInput[]
    OR?: PlaylistWhereInput[]
    NOT?: PlaylistWhereInput | PlaylistWhereInput[]
    id?: StringFilter<"Playlist"> | string
    name?: StringFilter<"Playlist"> | string
    description?: StringNullableFilter<"Playlist"> | string | null
    createdAt?: DateTimeFilter<"Playlist"> | Date | string
    updatedAt?: DateTimeFilter<"Playlist"> | Date | string
    userId?: StringFilter<"Playlist"> | string
    problems?: ProblemPlaylistListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PlaylistOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    problems?: ProblemPlaylistOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type PlaylistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_userId?: PlaylistNameUserIdCompoundUniqueInput
    AND?: PlaylistWhereInput | PlaylistWhereInput[]
    OR?: PlaylistWhereInput[]
    NOT?: PlaylistWhereInput | PlaylistWhereInput[]
    name?: StringFilter<"Playlist"> | string
    description?: StringNullableFilter<"Playlist"> | string | null
    createdAt?: DateTimeFilter<"Playlist"> | Date | string
    updatedAt?: DateTimeFilter<"Playlist"> | Date | string
    userId?: StringFilter<"Playlist"> | string
    problems?: ProblemPlaylistListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "name_userId">

  export type PlaylistOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: PlaylistCountOrderByAggregateInput
    _max?: PlaylistMaxOrderByAggregateInput
    _min?: PlaylistMinOrderByAggregateInput
  }

  export type PlaylistScalarWhereWithAggregatesInput = {
    AND?: PlaylistScalarWhereWithAggregatesInput | PlaylistScalarWhereWithAggregatesInput[]
    OR?: PlaylistScalarWhereWithAggregatesInput[]
    NOT?: PlaylistScalarWhereWithAggregatesInput | PlaylistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Playlist"> | string
    name?: StringWithAggregatesFilter<"Playlist"> | string
    description?: StringNullableWithAggregatesFilter<"Playlist"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Playlist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Playlist"> | Date | string
    userId?: StringWithAggregatesFilter<"Playlist"> | string
  }

  export type ProblemPlaylistWhereInput = {
    AND?: ProblemPlaylistWhereInput | ProblemPlaylistWhereInput[]
    OR?: ProblemPlaylistWhereInput[]
    NOT?: ProblemPlaylistWhereInput | ProblemPlaylistWhereInput[]
    id?: StringFilter<"ProblemPlaylist"> | string
    problemId?: StringFilter<"ProblemPlaylist"> | string
    playlistId?: StringFilter<"ProblemPlaylist"> | string
    createdAt?: DateTimeFilter<"ProblemPlaylist"> | Date | string
    updatedAt?: DateTimeFilter<"ProblemPlaylist"> | Date | string
    playlist?: XOR<PlaylistScalarRelationFilter, PlaylistWhereInput>
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
  }

  export type ProblemPlaylistOrderByWithRelationInput = {
    id?: SortOrder
    problemId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    playlist?: PlaylistOrderByWithRelationInput
    problem?: ProblemOrderByWithRelationInput
  }

  export type ProblemPlaylistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    problemId_playlistId?: ProblemPlaylistProblemIdPlaylistIdCompoundUniqueInput
    AND?: ProblemPlaylistWhereInput | ProblemPlaylistWhereInput[]
    OR?: ProblemPlaylistWhereInput[]
    NOT?: ProblemPlaylistWhereInput | ProblemPlaylistWhereInput[]
    problemId?: StringFilter<"ProblemPlaylist"> | string
    playlistId?: StringFilter<"ProblemPlaylist"> | string
    createdAt?: DateTimeFilter<"ProblemPlaylist"> | Date | string
    updatedAt?: DateTimeFilter<"ProblemPlaylist"> | Date | string
    playlist?: XOR<PlaylistScalarRelationFilter, PlaylistWhereInput>
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
  }, "id" | "problemId_playlistId">

  export type ProblemPlaylistOrderByWithAggregationInput = {
    id?: SortOrder
    problemId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProblemPlaylistCountOrderByAggregateInput
    _max?: ProblemPlaylistMaxOrderByAggregateInput
    _min?: ProblemPlaylistMinOrderByAggregateInput
  }

  export type ProblemPlaylistScalarWhereWithAggregatesInput = {
    AND?: ProblemPlaylistScalarWhereWithAggregatesInput | ProblemPlaylistScalarWhereWithAggregatesInput[]
    OR?: ProblemPlaylistScalarWhereWithAggregatesInput[]
    NOT?: ProblemPlaylistScalarWhereWithAggregatesInput | ProblemPlaylistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProblemPlaylist"> | string
    problemId?: StringWithAggregatesFilter<"ProblemPlaylist"> | string
    playlistId?: StringWithAggregatesFilter<"ProblemPlaylist"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProblemPlaylist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProblemPlaylist"> | Date | string
  }

  export type RevisionWhereInput = {
    AND?: RevisionWhereInput | RevisionWhereInput[]
    OR?: RevisionWhereInput[]
    NOT?: RevisionWhereInput | RevisionWhereInput[]
    id?: StringFilter<"Revision"> | string
    userId?: StringFilter<"Revision"> | string
    problemId?: StringFilter<"Revision"> | string
    createdAt?: DateTimeFilter<"Revision"> | Date | string
    updatedAt?: DateTimeFilter<"Revision"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
  }

  export type RevisionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    problem?: ProblemOrderByWithRelationInput
  }

  export type RevisionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_problemId?: RevisionUserIdProblemIdCompoundUniqueInput
    AND?: RevisionWhereInput | RevisionWhereInput[]
    OR?: RevisionWhereInput[]
    NOT?: RevisionWhereInput | RevisionWhereInput[]
    userId?: StringFilter<"Revision"> | string
    problemId?: StringFilter<"Revision"> | string
    createdAt?: DateTimeFilter<"Revision"> | Date | string
    updatedAt?: DateTimeFilter<"Revision"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
  }, "id" | "userId_problemId">

  export type RevisionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RevisionCountOrderByAggregateInput
    _max?: RevisionMaxOrderByAggregateInput
    _min?: RevisionMinOrderByAggregateInput
  }

  export type RevisionScalarWhereWithAggregatesInput = {
    AND?: RevisionScalarWhereWithAggregatesInput | RevisionScalarWhereWithAggregatesInput[]
    OR?: RevisionScalarWhereWithAggregatesInput[]
    NOT?: RevisionScalarWhereWithAggregatesInput | RevisionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Revision"> | string
    userId?: StringWithAggregatesFilter<"Revision"> | string
    problemId?: StringWithAggregatesFilter<"Revision"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Revision"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Revision"> | Date | string
  }

  export type DiscussionWhereInput = {
    AND?: DiscussionWhereInput | DiscussionWhereInput[]
    OR?: DiscussionWhereInput[]
    NOT?: DiscussionWhereInput | DiscussionWhereInput[]
    id?: StringFilter<"Discussion"> | string
    content?: StringFilter<"Discussion"> | string
    createdAt?: DateTimeFilter<"Discussion"> | Date | string
    updatedAt?: DateTimeFilter<"Discussion"> | Date | string
    problemId?: StringFilter<"Discussion"> | string
    authorId?: StringFilter<"Discussion"> | string
    parentId?: StringNullableFilter<"Discussion"> | string | null
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    parent?: XOR<DiscussionNullableScalarRelationFilter, DiscussionWhereInput> | null
    replies?: DiscussionListRelationFilter
    likes?: DiscussionLikeListRelationFilter
  }

  export type DiscussionOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    problemId?: SortOrder
    authorId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    problem?: ProblemOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    parent?: DiscussionOrderByWithRelationInput
    replies?: DiscussionOrderByRelationAggregateInput
    likes?: DiscussionLikeOrderByRelationAggregateInput
  }

  export type DiscussionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DiscussionWhereInput | DiscussionWhereInput[]
    OR?: DiscussionWhereInput[]
    NOT?: DiscussionWhereInput | DiscussionWhereInput[]
    content?: StringFilter<"Discussion"> | string
    createdAt?: DateTimeFilter<"Discussion"> | Date | string
    updatedAt?: DateTimeFilter<"Discussion"> | Date | string
    problemId?: StringFilter<"Discussion"> | string
    authorId?: StringFilter<"Discussion"> | string
    parentId?: StringNullableFilter<"Discussion"> | string | null
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    parent?: XOR<DiscussionNullableScalarRelationFilter, DiscussionWhereInput> | null
    replies?: DiscussionListRelationFilter
    likes?: DiscussionLikeListRelationFilter
  }, "id">

  export type DiscussionOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    problemId?: SortOrder
    authorId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    _count?: DiscussionCountOrderByAggregateInput
    _max?: DiscussionMaxOrderByAggregateInput
    _min?: DiscussionMinOrderByAggregateInput
  }

  export type DiscussionScalarWhereWithAggregatesInput = {
    AND?: DiscussionScalarWhereWithAggregatesInput | DiscussionScalarWhereWithAggregatesInput[]
    OR?: DiscussionScalarWhereWithAggregatesInput[]
    NOT?: DiscussionScalarWhereWithAggregatesInput | DiscussionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Discussion"> | string
    content?: StringWithAggregatesFilter<"Discussion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Discussion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Discussion"> | Date | string
    problemId?: StringWithAggregatesFilter<"Discussion"> | string
    authorId?: StringWithAggregatesFilter<"Discussion"> | string
    parentId?: StringNullableWithAggregatesFilter<"Discussion"> | string | null
  }

  export type DiscussionLikeWhereInput = {
    AND?: DiscussionLikeWhereInput | DiscussionLikeWhereInput[]
    OR?: DiscussionLikeWhereInput[]
    NOT?: DiscussionLikeWhereInput | DiscussionLikeWhereInput[]
    id?: StringFilter<"DiscussionLike"> | string
    createdAt?: DateTimeFilter<"DiscussionLike"> | Date | string
    discussionId?: StringFilter<"DiscussionLike"> | string
    userId?: StringFilter<"DiscussionLike"> | string
    discussion?: XOR<DiscussionScalarRelationFilter, DiscussionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DiscussionLikeOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    discussionId?: SortOrder
    userId?: SortOrder
    discussion?: DiscussionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type DiscussionLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    discussionId_userId?: DiscussionLikeDiscussionIdUserIdCompoundUniqueInput
    AND?: DiscussionLikeWhereInput | DiscussionLikeWhereInput[]
    OR?: DiscussionLikeWhereInput[]
    NOT?: DiscussionLikeWhereInput | DiscussionLikeWhereInput[]
    createdAt?: DateTimeFilter<"DiscussionLike"> | Date | string
    discussionId?: StringFilter<"DiscussionLike"> | string
    userId?: StringFilter<"DiscussionLike"> | string
    discussion?: XOR<DiscussionScalarRelationFilter, DiscussionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "discussionId_userId">

  export type DiscussionLikeOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    discussionId?: SortOrder
    userId?: SortOrder
    _count?: DiscussionLikeCountOrderByAggregateInput
    _max?: DiscussionLikeMaxOrderByAggregateInput
    _min?: DiscussionLikeMinOrderByAggregateInput
  }

  export type DiscussionLikeScalarWhereWithAggregatesInput = {
    AND?: DiscussionLikeScalarWhereWithAggregatesInput | DiscussionLikeScalarWhereWithAggregatesInput[]
    OR?: DiscussionLikeScalarWhereWithAggregatesInput[]
    NOT?: DiscussionLikeScalarWhereWithAggregatesInput | DiscussionLikeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DiscussionLike"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DiscussionLike"> | Date | string
    discussionId?: StringWithAggregatesFilter<"DiscussionLike"> | string
    userId?: StringWithAggregatesFilter<"DiscussionLike"> | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistCreateNestedManyWithoutUserInput
    discussions?: DiscussionCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeCreateNestedManyWithoutUserInput
    Revision?: RevisionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedUncheckedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeUncheckedCreateNestedManyWithoutUserInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUpdateManyWithoutUserNestedInput
    Revision?: RevisionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUncheckedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUncheckedUpdateManyWithoutUserNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProblemCreateInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProblemsInput
    submission?: SubmissionCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistCreateNestedManyWithoutProblemInput
    discussions?: DiscussionCreateNestedManyWithoutProblemInput
    Revision?: RevisionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    userId?: string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedUncheckedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistUncheckedCreateNestedManyWithoutProblemInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutProblemInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProblemsNestedInput
    submission?: SubmissionUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUncheckedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUncheckedUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type ProblemCreateManyInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    userId?: string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateInput = {
    id?: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutSubmissionInput
    user: UserCreateNestedOneWithoutSubmissionsInput
    testCases?: TestCaseResultCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    problemId: string
    userId: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testCases?: TestCaseResultUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutSubmissionNestedInput
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    testCases?: TestCaseResultUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testCases?: TestCaseResultUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionCreateManyInput = {
    id?: string
    problemId: string
    userId: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCaseResultCreateInput = {
    id?: string
    testCase: number
    passed: boolean
    stdout?: string | null
    expected?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submission: SubmissionCreateNestedOneWithoutTestCasesInput
  }

  export type TestCaseResultUncheckedCreateInput = {
    id?: string
    submissionId: string
    testCase: number
    passed: boolean
    stdout?: string | null
    expected?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestCaseResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testCase?: IntFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    expected?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUpdateOneRequiredWithoutTestCasesNestedInput
  }

  export type TestCaseResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    testCase?: IntFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    expected?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCaseResultCreateManyInput = {
    id?: string
    submissionId: string
    testCase: number
    passed: boolean
    stdout?: string | null
    expected?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestCaseResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    testCase?: IntFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    expected?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCaseResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    testCase?: IntFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    expected?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSolvedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutSolvedByInput
    user: UserCreateNestedOneWithoutSolvedProblemsInput
  }

  export type ProblemSolvedUncheckedCreateInput = {
    id?: string
    userId: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemSolvedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutSolvedByNestedInput
    user?: UserUpdateOneRequiredWithoutSolvedProblemsNestedInput
  }

  export type ProblemSolvedUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSolvedCreateManyInput = {
    id?: string
    userId: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemSolvedUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSolvedUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    problems?: ProblemPlaylistCreateNestedManyWithoutPlaylistInput
    user: UserCreateNestedOneWithoutPlaylistsInput
  }

  export type PlaylistUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    problems?: ProblemPlaylistUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemPlaylistUpdateManyWithoutPlaylistNestedInput
    user?: UserUpdateOneRequiredWithoutPlaylistsNestedInput
  }

  export type PlaylistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    problems?: ProblemPlaylistUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type PlaylistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemPlaylistCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    playlist: PlaylistCreateNestedOneWithoutProblemsInput
    problem: ProblemCreateNestedOneWithoutProblemsPlaylistInput
  }

  export type ProblemPlaylistUncheckedCreateInput = {
    id?: string
    problemId: string
    playlistId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemPlaylistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlist?: PlaylistUpdateOneRequiredWithoutProblemsNestedInput
    problem?: ProblemUpdateOneRequiredWithoutProblemsPlaylistNestedInput
  }

  export type ProblemPlaylistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemPlaylistCreateManyInput = {
    id?: string
    problemId: string
    playlistId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemPlaylistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemPlaylistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RevisionCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRevisionInput
    problem: ProblemCreateNestedOneWithoutRevisionInput
  }

  export type RevisionUncheckedCreateInput = {
    id?: string
    userId: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RevisionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRevisionNestedInput
    problem?: ProblemUpdateOneRequiredWithoutRevisionNestedInput
  }

  export type RevisionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RevisionCreateManyInput = {
    id?: string
    userId: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RevisionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RevisionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscussionCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutDiscussionsInput
    author: UserCreateNestedOneWithoutDiscussionsInput
    parent?: DiscussionCreateNestedOneWithoutRepliesInput
    replies?: DiscussionCreateNestedManyWithoutParentInput
    likes?: DiscussionLikeCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionUncheckedCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problemId: string
    authorId: string
    parentId?: string | null
    replies?: DiscussionUncheckedCreateNestedManyWithoutParentInput
    likes?: DiscussionLikeUncheckedCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutDiscussionsNestedInput
    author?: UserUpdateOneRequiredWithoutDiscussionsNestedInput
    parent?: DiscussionUpdateOneWithoutRepliesNestedInput
    replies?: DiscussionUpdateManyWithoutParentNestedInput
    likes?: DiscussionLikeUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problemId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: DiscussionUncheckedUpdateManyWithoutParentNestedInput
    likes?: DiscussionLikeUncheckedUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionCreateManyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problemId: string
    authorId: string
    parentId?: string | null
  }

  export type DiscussionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscussionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problemId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiscussionLikeCreateInput = {
    id?: string
    createdAt?: Date | string
    discussion: DiscussionCreateNestedOneWithoutLikesInput
    user: UserCreateNestedOneWithoutDiscussionLikesInput
  }

  export type DiscussionLikeUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    discussionId: string
    userId: string
  }

  export type DiscussionLikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discussion?: DiscussionUpdateOneRequiredWithoutLikesNestedInput
    user?: UserUpdateOneRequiredWithoutDiscussionLikesNestedInput
  }

  export type DiscussionLikeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discussionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type DiscussionLikeCreateManyInput = {
    id?: string
    createdAt?: Date | string
    discussionId: string
    userId: string
  }

  export type DiscussionLikeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscussionLikeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discussionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type ProblemListRelationFilter = {
    every?: ProblemWhereInput
    some?: ProblemWhereInput
    none?: ProblemWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type ProblemSolvedListRelationFilter = {
    every?: ProblemSolvedWhereInput
    some?: ProblemSolvedWhereInput
    none?: ProblemSolvedWhereInput
  }

  export type PlaylistListRelationFilter = {
    every?: PlaylistWhereInput
    some?: PlaylistWhereInput
    none?: PlaylistWhereInput
  }

  export type DiscussionListRelationFilter = {
    every?: DiscussionWhereInput
    some?: DiscussionWhereInput
    none?: DiscussionWhereInput
  }

  export type DiscussionLikeListRelationFilter = {
    every?: DiscussionLikeWhereInput
    some?: DiscussionLikeWhereInput
    none?: DiscussionLikeWhereInput
  }

  export type RevisionListRelationFilter = {
    every?: RevisionWhereInput
    some?: RevisionWhereInput
    none?: RevisionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProblemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProblemSolvedOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlaylistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DiscussionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DiscussionLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RevisionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
    streakCount?: SortOrder
    maxStreakCount?: SortOrder
    firebaseUid?: SortOrder
    authProvider?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    bio?: SortOrder
    githubProfile?: SortOrder
    linkedinProfile?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    streakCount?: SortOrder
    maxStreakCount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
    streakCount?: SortOrder
    maxStreakCount?: SortOrder
    firebaseUid?: SortOrder
    authProvider?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    bio?: SortOrder
    githubProfile?: SortOrder
    linkedinProfile?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
    streakCount?: SortOrder
    maxStreakCount?: SortOrder
    firebaseUid?: SortOrder
    authProvider?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    bio?: SortOrder
    githubProfile?: SortOrder
    linkedinProfile?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    streakCount?: SortOrder
    maxStreakCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ProblemPlaylistListRelationFilter = {
    every?: ProblemPlaylistWhereInput
    some?: ProblemPlaylistWhereInput
    none?: ProblemPlaylistWhereInput
  }

  export type ProblemPlaylistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProblemCountOrderByAggregateInput = {
    id?: SortOrder
    leetcodeId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    isPremium?: SortOrder
    solutionLink?: SortOrder
    acceptanceRate?: SortOrder
    frequency?: SortOrder
    url?: SortOrder
    discussCount?: SortOrder
    accepted?: SortOrder
    submissions?: SortOrder
    companies?: SortOrder
    relatedTopics?: SortOrder
    likes?: SortOrder
    dislikes?: SortOrder
    rating?: SortOrder
    askedByFaang?: SortOrder
    similarQuestions?: SortOrder
    tags?: SortOrder
    companyTags?: SortOrder
    userId?: SortOrder
    examples?: SortOrder
    constraints?: SortOrder
    hints?: SortOrder
    editorial?: SortOrder
    testcases?: SortOrder
    codeSnippets?: SortOrder
    referenceSolutions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemAvgOrderByAggregateInput = {
    leetcodeId?: SortOrder
    acceptanceRate?: SortOrder
    frequency?: SortOrder
    discussCount?: SortOrder
    accepted?: SortOrder
    submissions?: SortOrder
    likes?: SortOrder
    dislikes?: SortOrder
    rating?: SortOrder
  }

  export type ProblemMaxOrderByAggregateInput = {
    id?: SortOrder
    leetcodeId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    isPremium?: SortOrder
    solutionLink?: SortOrder
    acceptanceRate?: SortOrder
    frequency?: SortOrder
    url?: SortOrder
    discussCount?: SortOrder
    accepted?: SortOrder
    submissions?: SortOrder
    likes?: SortOrder
    dislikes?: SortOrder
    rating?: SortOrder
    askedByFaang?: SortOrder
    similarQuestions?: SortOrder
    userId?: SortOrder
    constraints?: SortOrder
    hints?: SortOrder
    editorial?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemMinOrderByAggregateInput = {
    id?: SortOrder
    leetcodeId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    isPremium?: SortOrder
    solutionLink?: SortOrder
    acceptanceRate?: SortOrder
    frequency?: SortOrder
    url?: SortOrder
    discussCount?: SortOrder
    accepted?: SortOrder
    submissions?: SortOrder
    likes?: SortOrder
    dislikes?: SortOrder
    rating?: SortOrder
    askedByFaang?: SortOrder
    similarQuestions?: SortOrder
    userId?: SortOrder
    constraints?: SortOrder
    hints?: SortOrder
    editorial?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemSumOrderByAggregateInput = {
    leetcodeId?: SortOrder
    acceptanceRate?: SortOrder
    frequency?: SortOrder
    discussCount?: SortOrder
    accepted?: SortOrder
    submissions?: SortOrder
    likes?: SortOrder
    dislikes?: SortOrder
    rating?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProblemScalarRelationFilter = {
    is?: ProblemWhereInput
    isNot?: ProblemWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TestCaseResultListRelationFilter = {
    every?: TestCaseResultWhereInput
    some?: TestCaseResultWhereInput
    none?: TestCaseResultWhereInput
  }

  export type TestCaseResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    userId?: SortOrder
    sourceCode?: SortOrder
    language?: SortOrder
    stdin?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    compileOutput?: SortOrder
    status?: SortOrder
    memory?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    userId?: SortOrder
    language?: SortOrder
    stdin?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    compileOutput?: SortOrder
    status?: SortOrder
    memory?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    userId?: SortOrder
    language?: SortOrder
    stdin?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    compileOutput?: SortOrder
    status?: SortOrder
    memory?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type SubmissionScalarRelationFilter = {
    is?: SubmissionWhereInput
    isNot?: SubmissionWhereInput
  }

  export type TestCaseResultCountOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    testCase?: SortOrder
    passed?: SortOrder
    stdout?: SortOrder
    expected?: SortOrder
    stderr?: SortOrder
    compileOutput?: SortOrder
    status?: SortOrder
    memory?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestCaseResultAvgOrderByAggregateInput = {
    testCase?: SortOrder
  }

  export type TestCaseResultMaxOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    testCase?: SortOrder
    passed?: SortOrder
    stdout?: SortOrder
    expected?: SortOrder
    stderr?: SortOrder
    compileOutput?: SortOrder
    status?: SortOrder
    memory?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestCaseResultMinOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    testCase?: SortOrder
    passed?: SortOrder
    stdout?: SortOrder
    expected?: SortOrder
    stderr?: SortOrder
    compileOutput?: SortOrder
    status?: SortOrder
    memory?: SortOrder
    time?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestCaseResultSumOrderByAggregateInput = {
    testCase?: SortOrder
  }

  export type ProblemSolvedUserIdProblemIdCompoundUniqueInput = {
    userId: string
    problemId: string
  }

  export type ProblemSolvedCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemSolvedMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemSolvedMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlaylistNameUserIdCompoundUniqueInput = {
    name: string
    userId: string
  }

  export type PlaylistCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PlaylistMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PlaylistMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PlaylistScalarRelationFilter = {
    is?: PlaylistWhereInput
    isNot?: PlaylistWhereInput
  }

  export type ProblemPlaylistProblemIdPlaylistIdCompoundUniqueInput = {
    problemId: string
    playlistId: string
  }

  export type ProblemPlaylistCountOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemPlaylistMaxOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemPlaylistMinOrderByAggregateInput = {
    id?: SortOrder
    problemId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RevisionUserIdProblemIdCompoundUniqueInput = {
    userId: string
    problemId: string
  }

  export type RevisionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RevisionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RevisionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    problemId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscussionNullableScalarRelationFilter = {
    is?: DiscussionWhereInput | null
    isNot?: DiscussionWhereInput | null
  }

  export type DiscussionCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    problemId?: SortOrder
    authorId?: SortOrder
    parentId?: SortOrder
  }

  export type DiscussionMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    problemId?: SortOrder
    authorId?: SortOrder
    parentId?: SortOrder
  }

  export type DiscussionMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    problemId?: SortOrder
    authorId?: SortOrder
    parentId?: SortOrder
  }

  export type DiscussionScalarRelationFilter = {
    is?: DiscussionWhereInput
    isNot?: DiscussionWhereInput
  }

  export type DiscussionLikeDiscussionIdUserIdCompoundUniqueInput = {
    discussionId: string
    userId: string
  }

  export type DiscussionLikeCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    discussionId?: SortOrder
    userId?: SortOrder
  }

  export type DiscussionLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    discussionId?: SortOrder
    userId?: SortOrder
  }

  export type DiscussionLikeMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    discussionId?: SortOrder
    userId?: SortOrder
  }

  export type ProblemCreateNestedManyWithoutUserInput = {
    create?: XOR<ProblemCreateWithoutUserInput, ProblemUncheckedCreateWithoutUserInput> | ProblemCreateWithoutUserInput[] | ProblemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProblemCreateOrConnectWithoutUserInput | ProblemCreateOrConnectWithoutUserInput[]
    createMany?: ProblemCreateManyUserInputEnvelope
    connect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type ProblemSolvedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProblemSolvedCreateWithoutUserInput, ProblemSolvedUncheckedCreateWithoutUserInput> | ProblemSolvedCreateWithoutUserInput[] | ProblemSolvedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProblemSolvedCreateOrConnectWithoutUserInput | ProblemSolvedCreateOrConnectWithoutUserInput[]
    createMany?: ProblemSolvedCreateManyUserInputEnvelope
    connect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
  }

  export type PlaylistCreateNestedManyWithoutUserInput = {
    create?: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput> | PlaylistCreateWithoutUserInput[] | PlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutUserInput | PlaylistCreateOrConnectWithoutUserInput[]
    createMany?: PlaylistCreateManyUserInputEnvelope
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
  }

  export type DiscussionCreateNestedManyWithoutAuthorInput = {
    create?: XOR<DiscussionCreateWithoutAuthorInput, DiscussionUncheckedCreateWithoutAuthorInput> | DiscussionCreateWithoutAuthorInput[] | DiscussionUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutAuthorInput | DiscussionCreateOrConnectWithoutAuthorInput[]
    createMany?: DiscussionCreateManyAuthorInputEnvelope
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
  }

  export type DiscussionLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<DiscussionLikeCreateWithoutUserInput, DiscussionLikeUncheckedCreateWithoutUserInput> | DiscussionLikeCreateWithoutUserInput[] | DiscussionLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiscussionLikeCreateOrConnectWithoutUserInput | DiscussionLikeCreateOrConnectWithoutUserInput[]
    createMany?: DiscussionLikeCreateManyUserInputEnvelope
    connect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
  }

  export type RevisionCreateNestedManyWithoutUserInput = {
    create?: XOR<RevisionCreateWithoutUserInput, RevisionUncheckedCreateWithoutUserInput> | RevisionCreateWithoutUserInput[] | RevisionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutUserInput | RevisionCreateOrConnectWithoutUserInput[]
    createMany?: RevisionCreateManyUserInputEnvelope
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
  }

  export type ProblemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProblemCreateWithoutUserInput, ProblemUncheckedCreateWithoutUserInput> | ProblemCreateWithoutUserInput[] | ProblemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProblemCreateOrConnectWithoutUserInput | ProblemCreateOrConnectWithoutUserInput[]
    createMany?: ProblemCreateManyUserInputEnvelope
    connect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type ProblemSolvedUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProblemSolvedCreateWithoutUserInput, ProblemSolvedUncheckedCreateWithoutUserInput> | ProblemSolvedCreateWithoutUserInput[] | ProblemSolvedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProblemSolvedCreateOrConnectWithoutUserInput | ProblemSolvedCreateOrConnectWithoutUserInput[]
    createMany?: ProblemSolvedCreateManyUserInputEnvelope
    connect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
  }

  export type PlaylistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput> | PlaylistCreateWithoutUserInput[] | PlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutUserInput | PlaylistCreateOrConnectWithoutUserInput[]
    createMany?: PlaylistCreateManyUserInputEnvelope
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
  }

  export type DiscussionUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<DiscussionCreateWithoutAuthorInput, DiscussionUncheckedCreateWithoutAuthorInput> | DiscussionCreateWithoutAuthorInput[] | DiscussionUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutAuthorInput | DiscussionCreateOrConnectWithoutAuthorInput[]
    createMany?: DiscussionCreateManyAuthorInputEnvelope
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
  }

  export type DiscussionLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DiscussionLikeCreateWithoutUserInput, DiscussionLikeUncheckedCreateWithoutUserInput> | DiscussionLikeCreateWithoutUserInput[] | DiscussionLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiscussionLikeCreateOrConnectWithoutUserInput | DiscussionLikeCreateOrConnectWithoutUserInput[]
    createMany?: DiscussionLikeCreateManyUserInputEnvelope
    connect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
  }

  export type RevisionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RevisionCreateWithoutUserInput, RevisionUncheckedCreateWithoutUserInput> | RevisionCreateWithoutUserInput[] | RevisionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutUserInput | RevisionCreateOrConnectWithoutUserInput[]
    createMany?: RevisionCreateManyUserInputEnvelope
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type ProblemUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProblemCreateWithoutUserInput, ProblemUncheckedCreateWithoutUserInput> | ProblemCreateWithoutUserInput[] | ProblemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProblemCreateOrConnectWithoutUserInput | ProblemCreateOrConnectWithoutUserInput[]
    upsert?: ProblemUpsertWithWhereUniqueWithoutUserInput | ProblemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProblemCreateManyUserInputEnvelope
    set?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    disconnect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    delete?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    connect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    update?: ProblemUpdateWithWhereUniqueWithoutUserInput | ProblemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProblemUpdateManyWithWhereWithoutUserInput | ProblemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProblemScalarWhereInput | ProblemScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ProblemSolvedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProblemSolvedCreateWithoutUserInput, ProblemSolvedUncheckedCreateWithoutUserInput> | ProblemSolvedCreateWithoutUserInput[] | ProblemSolvedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProblemSolvedCreateOrConnectWithoutUserInput | ProblemSolvedCreateOrConnectWithoutUserInput[]
    upsert?: ProblemSolvedUpsertWithWhereUniqueWithoutUserInput | ProblemSolvedUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProblemSolvedCreateManyUserInputEnvelope
    set?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    disconnect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    delete?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    connect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    update?: ProblemSolvedUpdateWithWhereUniqueWithoutUserInput | ProblemSolvedUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProblemSolvedUpdateManyWithWhereWithoutUserInput | ProblemSolvedUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProblemSolvedScalarWhereInput | ProblemSolvedScalarWhereInput[]
  }

  export type PlaylistUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput> | PlaylistCreateWithoutUserInput[] | PlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutUserInput | PlaylistCreateOrConnectWithoutUserInput[]
    upsert?: PlaylistUpsertWithWhereUniqueWithoutUserInput | PlaylistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlaylistCreateManyUserInputEnvelope
    set?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    disconnect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    delete?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    update?: PlaylistUpdateWithWhereUniqueWithoutUserInput | PlaylistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlaylistUpdateManyWithWhereWithoutUserInput | PlaylistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
  }

  export type DiscussionUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<DiscussionCreateWithoutAuthorInput, DiscussionUncheckedCreateWithoutAuthorInput> | DiscussionCreateWithoutAuthorInput[] | DiscussionUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutAuthorInput | DiscussionCreateOrConnectWithoutAuthorInput[]
    upsert?: DiscussionUpsertWithWhereUniqueWithoutAuthorInput | DiscussionUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: DiscussionCreateManyAuthorInputEnvelope
    set?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    disconnect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    delete?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    update?: DiscussionUpdateWithWhereUniqueWithoutAuthorInput | DiscussionUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: DiscussionUpdateManyWithWhereWithoutAuthorInput | DiscussionUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: DiscussionScalarWhereInput | DiscussionScalarWhereInput[]
  }

  export type DiscussionLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<DiscussionLikeCreateWithoutUserInput, DiscussionLikeUncheckedCreateWithoutUserInput> | DiscussionLikeCreateWithoutUserInput[] | DiscussionLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiscussionLikeCreateOrConnectWithoutUserInput | DiscussionLikeCreateOrConnectWithoutUserInput[]
    upsert?: DiscussionLikeUpsertWithWhereUniqueWithoutUserInput | DiscussionLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DiscussionLikeCreateManyUserInputEnvelope
    set?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    disconnect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    delete?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    connect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    update?: DiscussionLikeUpdateWithWhereUniqueWithoutUserInput | DiscussionLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DiscussionLikeUpdateManyWithWhereWithoutUserInput | DiscussionLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DiscussionLikeScalarWhereInput | DiscussionLikeScalarWhereInput[]
  }

  export type RevisionUpdateManyWithoutUserNestedInput = {
    create?: XOR<RevisionCreateWithoutUserInput, RevisionUncheckedCreateWithoutUserInput> | RevisionCreateWithoutUserInput[] | RevisionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutUserInput | RevisionCreateOrConnectWithoutUserInput[]
    upsert?: RevisionUpsertWithWhereUniqueWithoutUserInput | RevisionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RevisionCreateManyUserInputEnvelope
    set?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    disconnect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    delete?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    update?: RevisionUpdateWithWhereUniqueWithoutUserInput | RevisionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RevisionUpdateManyWithWhereWithoutUserInput | RevisionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
  }

  export type ProblemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProblemCreateWithoutUserInput, ProblemUncheckedCreateWithoutUserInput> | ProblemCreateWithoutUserInput[] | ProblemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProblemCreateOrConnectWithoutUserInput | ProblemCreateOrConnectWithoutUserInput[]
    upsert?: ProblemUpsertWithWhereUniqueWithoutUserInput | ProblemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProblemCreateManyUserInputEnvelope
    set?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    disconnect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    delete?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    connect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    update?: ProblemUpdateWithWhereUniqueWithoutUserInput | ProblemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProblemUpdateManyWithWhereWithoutUserInput | ProblemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProblemScalarWhereInput | ProblemScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ProblemSolvedUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProblemSolvedCreateWithoutUserInput, ProblemSolvedUncheckedCreateWithoutUserInput> | ProblemSolvedCreateWithoutUserInput[] | ProblemSolvedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProblemSolvedCreateOrConnectWithoutUserInput | ProblemSolvedCreateOrConnectWithoutUserInput[]
    upsert?: ProblemSolvedUpsertWithWhereUniqueWithoutUserInput | ProblemSolvedUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProblemSolvedCreateManyUserInputEnvelope
    set?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    disconnect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    delete?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    connect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    update?: ProblemSolvedUpdateWithWhereUniqueWithoutUserInput | ProblemSolvedUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProblemSolvedUpdateManyWithWhereWithoutUserInput | ProblemSolvedUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProblemSolvedScalarWhereInput | ProblemSolvedScalarWhereInput[]
  }

  export type PlaylistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput> | PlaylistCreateWithoutUserInput[] | PlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutUserInput | PlaylistCreateOrConnectWithoutUserInput[]
    upsert?: PlaylistUpsertWithWhereUniqueWithoutUserInput | PlaylistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlaylistCreateManyUserInputEnvelope
    set?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    disconnect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    delete?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    update?: PlaylistUpdateWithWhereUniqueWithoutUserInput | PlaylistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlaylistUpdateManyWithWhereWithoutUserInput | PlaylistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
  }

  export type DiscussionUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<DiscussionCreateWithoutAuthorInput, DiscussionUncheckedCreateWithoutAuthorInput> | DiscussionCreateWithoutAuthorInput[] | DiscussionUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutAuthorInput | DiscussionCreateOrConnectWithoutAuthorInput[]
    upsert?: DiscussionUpsertWithWhereUniqueWithoutAuthorInput | DiscussionUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: DiscussionCreateManyAuthorInputEnvelope
    set?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    disconnect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    delete?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    update?: DiscussionUpdateWithWhereUniqueWithoutAuthorInput | DiscussionUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: DiscussionUpdateManyWithWhereWithoutAuthorInput | DiscussionUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: DiscussionScalarWhereInput | DiscussionScalarWhereInput[]
  }

  export type DiscussionLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DiscussionLikeCreateWithoutUserInput, DiscussionLikeUncheckedCreateWithoutUserInput> | DiscussionLikeCreateWithoutUserInput[] | DiscussionLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiscussionLikeCreateOrConnectWithoutUserInput | DiscussionLikeCreateOrConnectWithoutUserInput[]
    upsert?: DiscussionLikeUpsertWithWhereUniqueWithoutUserInput | DiscussionLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DiscussionLikeCreateManyUserInputEnvelope
    set?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    disconnect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    delete?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    connect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    update?: DiscussionLikeUpdateWithWhereUniqueWithoutUserInput | DiscussionLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DiscussionLikeUpdateManyWithWhereWithoutUserInput | DiscussionLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DiscussionLikeScalarWhereInput | DiscussionLikeScalarWhereInput[]
  }

  export type RevisionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RevisionCreateWithoutUserInput, RevisionUncheckedCreateWithoutUserInput> | RevisionCreateWithoutUserInput[] | RevisionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutUserInput | RevisionCreateOrConnectWithoutUserInput[]
    upsert?: RevisionUpsertWithWhereUniqueWithoutUserInput | RevisionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RevisionCreateManyUserInputEnvelope
    set?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    disconnect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    delete?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    update?: RevisionUpdateWithWhereUniqueWithoutUserInput | RevisionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RevisionUpdateManyWithWhereWithoutUserInput | RevisionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
  }

  export type ProblemCreatecompaniesInput = {
    set: string[]
  }

  export type ProblemCreaterelatedTopicsInput = {
    set: string[]
  }

  export type ProblemCreatetagsInput = {
    set: string[]
  }

  export type ProblemCreatecompanyTagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProblemsInput = {
    create?: XOR<UserCreateWithoutProblemsInput, UserUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProblemsInput
    connect?: UserWhereUniqueInput
  }

  export type SubmissionCreateNestedManyWithoutProblemInput = {
    create?: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput> | SubmissionCreateWithoutProblemInput[] | SubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProblemInput | SubmissionCreateOrConnectWithoutProblemInput[]
    createMany?: SubmissionCreateManyProblemInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type ProblemSolvedCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemSolvedCreateWithoutProblemInput, ProblemSolvedUncheckedCreateWithoutProblemInput> | ProblemSolvedCreateWithoutProblemInput[] | ProblemSolvedUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemSolvedCreateOrConnectWithoutProblemInput | ProblemSolvedCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemSolvedCreateManyProblemInputEnvelope
    connect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
  }

  export type ProblemPlaylistCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemPlaylistCreateWithoutProblemInput, ProblemPlaylistUncheckedCreateWithoutProblemInput> | ProblemPlaylistCreateWithoutProblemInput[] | ProblemPlaylistUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemPlaylistCreateOrConnectWithoutProblemInput | ProblemPlaylistCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemPlaylistCreateManyProblemInputEnvelope
    connect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
  }

  export type DiscussionCreateNestedManyWithoutProblemInput = {
    create?: XOR<DiscussionCreateWithoutProblemInput, DiscussionUncheckedCreateWithoutProblemInput> | DiscussionCreateWithoutProblemInput[] | DiscussionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutProblemInput | DiscussionCreateOrConnectWithoutProblemInput[]
    createMany?: DiscussionCreateManyProblemInputEnvelope
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
  }

  export type RevisionCreateNestedManyWithoutProblemInput = {
    create?: XOR<RevisionCreateWithoutProblemInput, RevisionUncheckedCreateWithoutProblemInput> | RevisionCreateWithoutProblemInput[] | RevisionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutProblemInput | RevisionCreateOrConnectWithoutProblemInput[]
    createMany?: RevisionCreateManyProblemInputEnvelope
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput> | SubmissionCreateWithoutProblemInput[] | SubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProblemInput | SubmissionCreateOrConnectWithoutProblemInput[]
    createMany?: SubmissionCreateManyProblemInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type ProblemSolvedUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemSolvedCreateWithoutProblemInput, ProblemSolvedUncheckedCreateWithoutProblemInput> | ProblemSolvedCreateWithoutProblemInput[] | ProblemSolvedUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemSolvedCreateOrConnectWithoutProblemInput | ProblemSolvedCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemSolvedCreateManyProblemInputEnvelope
    connect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
  }

  export type ProblemPlaylistUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemPlaylistCreateWithoutProblemInput, ProblemPlaylistUncheckedCreateWithoutProblemInput> | ProblemPlaylistCreateWithoutProblemInput[] | ProblemPlaylistUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemPlaylistCreateOrConnectWithoutProblemInput | ProblemPlaylistCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemPlaylistCreateManyProblemInputEnvelope
    connect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
  }

  export type DiscussionUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<DiscussionCreateWithoutProblemInput, DiscussionUncheckedCreateWithoutProblemInput> | DiscussionCreateWithoutProblemInput[] | DiscussionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutProblemInput | DiscussionCreateOrConnectWithoutProblemInput[]
    createMany?: DiscussionCreateManyProblemInputEnvelope
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
  }

  export type RevisionUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<RevisionCreateWithoutProblemInput, RevisionUncheckedCreateWithoutProblemInput> | RevisionCreateWithoutProblemInput[] | RevisionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutProblemInput | RevisionCreateOrConnectWithoutProblemInput[]
    createMany?: RevisionCreateManyProblemInputEnvelope
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.Difficulty
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProblemUpdatecompaniesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProblemUpdaterelatedTopicsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProblemUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProblemUpdatecompanyTagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneWithoutProblemsNestedInput = {
    create?: XOR<UserCreateWithoutProblemsInput, UserUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProblemsInput
    upsert?: UserUpsertWithoutProblemsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProblemsInput, UserUpdateWithoutProblemsInput>, UserUncheckedUpdateWithoutProblemsInput>
  }

  export type SubmissionUpdateManyWithoutProblemNestedInput = {
    create?: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput> | SubmissionCreateWithoutProblemInput[] | SubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProblemInput | SubmissionCreateOrConnectWithoutProblemInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutProblemInput | SubmissionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: SubmissionCreateManyProblemInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutProblemInput | SubmissionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutProblemInput | SubmissionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ProblemSolvedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemSolvedCreateWithoutProblemInput, ProblemSolvedUncheckedCreateWithoutProblemInput> | ProblemSolvedCreateWithoutProblemInput[] | ProblemSolvedUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemSolvedCreateOrConnectWithoutProblemInput | ProblemSolvedCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemSolvedUpsertWithWhereUniqueWithoutProblemInput | ProblemSolvedUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemSolvedCreateManyProblemInputEnvelope
    set?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    disconnect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    delete?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    connect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    update?: ProblemSolvedUpdateWithWhereUniqueWithoutProblemInput | ProblemSolvedUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemSolvedUpdateManyWithWhereWithoutProblemInput | ProblemSolvedUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemSolvedScalarWhereInput | ProblemSolvedScalarWhereInput[]
  }

  export type ProblemPlaylistUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemPlaylistCreateWithoutProblemInput, ProblemPlaylistUncheckedCreateWithoutProblemInput> | ProblemPlaylistCreateWithoutProblemInput[] | ProblemPlaylistUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemPlaylistCreateOrConnectWithoutProblemInput | ProblemPlaylistCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemPlaylistUpsertWithWhereUniqueWithoutProblemInput | ProblemPlaylistUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemPlaylistCreateManyProblemInputEnvelope
    set?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    disconnect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    delete?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    connect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    update?: ProblemPlaylistUpdateWithWhereUniqueWithoutProblemInput | ProblemPlaylistUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemPlaylistUpdateManyWithWhereWithoutProblemInput | ProblemPlaylistUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemPlaylistScalarWhereInput | ProblemPlaylistScalarWhereInput[]
  }

  export type DiscussionUpdateManyWithoutProblemNestedInput = {
    create?: XOR<DiscussionCreateWithoutProblemInput, DiscussionUncheckedCreateWithoutProblemInput> | DiscussionCreateWithoutProblemInput[] | DiscussionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutProblemInput | DiscussionCreateOrConnectWithoutProblemInput[]
    upsert?: DiscussionUpsertWithWhereUniqueWithoutProblemInput | DiscussionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: DiscussionCreateManyProblemInputEnvelope
    set?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    disconnect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    delete?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    update?: DiscussionUpdateWithWhereUniqueWithoutProblemInput | DiscussionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: DiscussionUpdateManyWithWhereWithoutProblemInput | DiscussionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: DiscussionScalarWhereInput | DiscussionScalarWhereInput[]
  }

  export type RevisionUpdateManyWithoutProblemNestedInput = {
    create?: XOR<RevisionCreateWithoutProblemInput, RevisionUncheckedCreateWithoutProblemInput> | RevisionCreateWithoutProblemInput[] | RevisionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutProblemInput | RevisionCreateOrConnectWithoutProblemInput[]
    upsert?: RevisionUpsertWithWhereUniqueWithoutProblemInput | RevisionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: RevisionCreateManyProblemInputEnvelope
    set?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    disconnect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    delete?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    update?: RevisionUpdateWithWhereUniqueWithoutProblemInput | RevisionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: RevisionUpdateManyWithWhereWithoutProblemInput | RevisionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput> | SubmissionCreateWithoutProblemInput[] | SubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProblemInput | SubmissionCreateOrConnectWithoutProblemInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutProblemInput | SubmissionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: SubmissionCreateManyProblemInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutProblemInput | SubmissionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutProblemInput | SubmissionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ProblemSolvedUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemSolvedCreateWithoutProblemInput, ProblemSolvedUncheckedCreateWithoutProblemInput> | ProblemSolvedCreateWithoutProblemInput[] | ProblemSolvedUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemSolvedCreateOrConnectWithoutProblemInput | ProblemSolvedCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemSolvedUpsertWithWhereUniqueWithoutProblemInput | ProblemSolvedUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemSolvedCreateManyProblemInputEnvelope
    set?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    disconnect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    delete?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    connect?: ProblemSolvedWhereUniqueInput | ProblemSolvedWhereUniqueInput[]
    update?: ProblemSolvedUpdateWithWhereUniqueWithoutProblemInput | ProblemSolvedUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemSolvedUpdateManyWithWhereWithoutProblemInput | ProblemSolvedUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemSolvedScalarWhereInput | ProblemSolvedScalarWhereInput[]
  }

  export type ProblemPlaylistUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemPlaylistCreateWithoutProblemInput, ProblemPlaylistUncheckedCreateWithoutProblemInput> | ProblemPlaylistCreateWithoutProblemInput[] | ProblemPlaylistUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemPlaylistCreateOrConnectWithoutProblemInput | ProblemPlaylistCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemPlaylistUpsertWithWhereUniqueWithoutProblemInput | ProblemPlaylistUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemPlaylistCreateManyProblemInputEnvelope
    set?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    disconnect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    delete?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    connect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    update?: ProblemPlaylistUpdateWithWhereUniqueWithoutProblemInput | ProblemPlaylistUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemPlaylistUpdateManyWithWhereWithoutProblemInput | ProblemPlaylistUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemPlaylistScalarWhereInput | ProblemPlaylistScalarWhereInput[]
  }

  export type DiscussionUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<DiscussionCreateWithoutProblemInput, DiscussionUncheckedCreateWithoutProblemInput> | DiscussionCreateWithoutProblemInput[] | DiscussionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutProblemInput | DiscussionCreateOrConnectWithoutProblemInput[]
    upsert?: DiscussionUpsertWithWhereUniqueWithoutProblemInput | DiscussionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: DiscussionCreateManyProblemInputEnvelope
    set?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    disconnect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    delete?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    update?: DiscussionUpdateWithWhereUniqueWithoutProblemInput | DiscussionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: DiscussionUpdateManyWithWhereWithoutProblemInput | DiscussionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: DiscussionScalarWhereInput | DiscussionScalarWhereInput[]
  }

  export type RevisionUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<RevisionCreateWithoutProblemInput, RevisionUncheckedCreateWithoutProblemInput> | RevisionCreateWithoutProblemInput[] | RevisionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: RevisionCreateOrConnectWithoutProblemInput | RevisionCreateOrConnectWithoutProblemInput[]
    upsert?: RevisionUpsertWithWhereUniqueWithoutProblemInput | RevisionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: RevisionCreateManyProblemInputEnvelope
    set?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    disconnect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    delete?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    connect?: RevisionWhereUniqueInput | RevisionWhereUniqueInput[]
    update?: RevisionUpdateWithWhereUniqueWithoutProblemInput | RevisionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: RevisionUpdateManyWithWhereWithoutProblemInput | RevisionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
  }

  export type ProblemCreateNestedOneWithoutSubmissionInput = {
    create?: XOR<ProblemCreateWithoutSubmissionInput, ProblemUncheckedCreateWithoutSubmissionInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSubmissionInput
    connect?: ProblemWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type TestCaseResultCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<TestCaseResultCreateWithoutSubmissionInput, TestCaseResultUncheckedCreateWithoutSubmissionInput> | TestCaseResultCreateWithoutSubmissionInput[] | TestCaseResultUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: TestCaseResultCreateOrConnectWithoutSubmissionInput | TestCaseResultCreateOrConnectWithoutSubmissionInput[]
    createMany?: TestCaseResultCreateManySubmissionInputEnvelope
    connect?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
  }

  export type TestCaseResultUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<TestCaseResultCreateWithoutSubmissionInput, TestCaseResultUncheckedCreateWithoutSubmissionInput> | TestCaseResultCreateWithoutSubmissionInput[] | TestCaseResultUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: TestCaseResultCreateOrConnectWithoutSubmissionInput | TestCaseResultCreateOrConnectWithoutSubmissionInput[]
    createMany?: TestCaseResultCreateManySubmissionInputEnvelope
    connect?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
  }

  export type ProblemUpdateOneRequiredWithoutSubmissionNestedInput = {
    create?: XOR<ProblemCreateWithoutSubmissionInput, ProblemUncheckedCreateWithoutSubmissionInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSubmissionInput
    upsert?: ProblemUpsertWithoutSubmissionInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutSubmissionInput, ProblemUpdateWithoutSubmissionInput>, ProblemUncheckedUpdateWithoutSubmissionInput>
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type TestCaseResultUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<TestCaseResultCreateWithoutSubmissionInput, TestCaseResultUncheckedCreateWithoutSubmissionInput> | TestCaseResultCreateWithoutSubmissionInput[] | TestCaseResultUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: TestCaseResultCreateOrConnectWithoutSubmissionInput | TestCaseResultCreateOrConnectWithoutSubmissionInput[]
    upsert?: TestCaseResultUpsertWithWhereUniqueWithoutSubmissionInput | TestCaseResultUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: TestCaseResultCreateManySubmissionInputEnvelope
    set?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
    disconnect?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
    delete?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
    connect?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
    update?: TestCaseResultUpdateWithWhereUniqueWithoutSubmissionInput | TestCaseResultUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: TestCaseResultUpdateManyWithWhereWithoutSubmissionInput | TestCaseResultUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: TestCaseResultScalarWhereInput | TestCaseResultScalarWhereInput[]
  }

  export type TestCaseResultUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<TestCaseResultCreateWithoutSubmissionInput, TestCaseResultUncheckedCreateWithoutSubmissionInput> | TestCaseResultCreateWithoutSubmissionInput[] | TestCaseResultUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: TestCaseResultCreateOrConnectWithoutSubmissionInput | TestCaseResultCreateOrConnectWithoutSubmissionInput[]
    upsert?: TestCaseResultUpsertWithWhereUniqueWithoutSubmissionInput | TestCaseResultUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: TestCaseResultCreateManySubmissionInputEnvelope
    set?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
    disconnect?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
    delete?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
    connect?: TestCaseResultWhereUniqueInput | TestCaseResultWhereUniqueInput[]
    update?: TestCaseResultUpdateWithWhereUniqueWithoutSubmissionInput | TestCaseResultUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: TestCaseResultUpdateManyWithWhereWithoutSubmissionInput | TestCaseResultUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: TestCaseResultScalarWhereInput | TestCaseResultScalarWhereInput[]
  }

  export type SubmissionCreateNestedOneWithoutTestCasesInput = {
    create?: XOR<SubmissionCreateWithoutTestCasesInput, SubmissionUncheckedCreateWithoutTestCasesInput>
    connectOrCreate?: SubmissionCreateOrConnectWithoutTestCasesInput
    connect?: SubmissionWhereUniqueInput
  }

  export type SubmissionUpdateOneRequiredWithoutTestCasesNestedInput = {
    create?: XOR<SubmissionCreateWithoutTestCasesInput, SubmissionUncheckedCreateWithoutTestCasesInput>
    connectOrCreate?: SubmissionCreateOrConnectWithoutTestCasesInput
    upsert?: SubmissionUpsertWithoutTestCasesInput
    connect?: SubmissionWhereUniqueInput
    update?: XOR<XOR<SubmissionUpdateToOneWithWhereWithoutTestCasesInput, SubmissionUpdateWithoutTestCasesInput>, SubmissionUncheckedUpdateWithoutTestCasesInput>
  }

  export type ProblemCreateNestedOneWithoutSolvedByInput = {
    create?: XOR<ProblemCreateWithoutSolvedByInput, ProblemUncheckedCreateWithoutSolvedByInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSolvedByInput
    connect?: ProblemWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSolvedProblemsInput = {
    create?: XOR<UserCreateWithoutSolvedProblemsInput, UserUncheckedCreateWithoutSolvedProblemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSolvedProblemsInput
    connect?: UserWhereUniqueInput
  }

  export type ProblemUpdateOneRequiredWithoutSolvedByNestedInput = {
    create?: XOR<ProblemCreateWithoutSolvedByInput, ProblemUncheckedCreateWithoutSolvedByInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSolvedByInput
    upsert?: ProblemUpsertWithoutSolvedByInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutSolvedByInput, ProblemUpdateWithoutSolvedByInput>, ProblemUncheckedUpdateWithoutSolvedByInput>
  }

  export type UserUpdateOneRequiredWithoutSolvedProblemsNestedInput = {
    create?: XOR<UserCreateWithoutSolvedProblemsInput, UserUncheckedCreateWithoutSolvedProblemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSolvedProblemsInput
    upsert?: UserUpsertWithoutSolvedProblemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSolvedProblemsInput, UserUpdateWithoutSolvedProblemsInput>, UserUncheckedUpdateWithoutSolvedProblemsInput>
  }

  export type ProblemPlaylistCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<ProblemPlaylistCreateWithoutPlaylistInput, ProblemPlaylistUncheckedCreateWithoutPlaylistInput> | ProblemPlaylistCreateWithoutPlaylistInput[] | ProblemPlaylistUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: ProblemPlaylistCreateOrConnectWithoutPlaylistInput | ProblemPlaylistCreateOrConnectWithoutPlaylistInput[]
    createMany?: ProblemPlaylistCreateManyPlaylistInputEnvelope
    connect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutPlaylistsInput = {
    create?: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlaylistsInput
    connect?: UserWhereUniqueInput
  }

  export type ProblemPlaylistUncheckedCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<ProblemPlaylistCreateWithoutPlaylistInput, ProblemPlaylistUncheckedCreateWithoutPlaylistInput> | ProblemPlaylistCreateWithoutPlaylistInput[] | ProblemPlaylistUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: ProblemPlaylistCreateOrConnectWithoutPlaylistInput | ProblemPlaylistCreateOrConnectWithoutPlaylistInput[]
    createMany?: ProblemPlaylistCreateManyPlaylistInputEnvelope
    connect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
  }

  export type ProblemPlaylistUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<ProblemPlaylistCreateWithoutPlaylistInput, ProblemPlaylistUncheckedCreateWithoutPlaylistInput> | ProblemPlaylistCreateWithoutPlaylistInput[] | ProblemPlaylistUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: ProblemPlaylistCreateOrConnectWithoutPlaylistInput | ProblemPlaylistCreateOrConnectWithoutPlaylistInput[]
    upsert?: ProblemPlaylistUpsertWithWhereUniqueWithoutPlaylistInput | ProblemPlaylistUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: ProblemPlaylistCreateManyPlaylistInputEnvelope
    set?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    disconnect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    delete?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    connect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    update?: ProblemPlaylistUpdateWithWhereUniqueWithoutPlaylistInput | ProblemPlaylistUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: ProblemPlaylistUpdateManyWithWhereWithoutPlaylistInput | ProblemPlaylistUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: ProblemPlaylistScalarWhereInput | ProblemPlaylistScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutPlaylistsNestedInput = {
    create?: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlaylistsInput
    upsert?: UserUpsertWithoutPlaylistsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlaylistsInput, UserUpdateWithoutPlaylistsInput>, UserUncheckedUpdateWithoutPlaylistsInput>
  }

  export type ProblemPlaylistUncheckedUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<ProblemPlaylistCreateWithoutPlaylistInput, ProblemPlaylistUncheckedCreateWithoutPlaylistInput> | ProblemPlaylistCreateWithoutPlaylistInput[] | ProblemPlaylistUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: ProblemPlaylistCreateOrConnectWithoutPlaylistInput | ProblemPlaylistCreateOrConnectWithoutPlaylistInput[]
    upsert?: ProblemPlaylistUpsertWithWhereUniqueWithoutPlaylistInput | ProblemPlaylistUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: ProblemPlaylistCreateManyPlaylistInputEnvelope
    set?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    disconnect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    delete?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    connect?: ProblemPlaylistWhereUniqueInput | ProblemPlaylistWhereUniqueInput[]
    update?: ProblemPlaylistUpdateWithWhereUniqueWithoutPlaylistInput | ProblemPlaylistUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: ProblemPlaylistUpdateManyWithWhereWithoutPlaylistInput | ProblemPlaylistUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: ProblemPlaylistScalarWhereInput | ProblemPlaylistScalarWhereInput[]
  }

  export type PlaylistCreateNestedOneWithoutProblemsInput = {
    create?: XOR<PlaylistCreateWithoutProblemsInput, PlaylistUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutProblemsInput
    connect?: PlaylistWhereUniqueInput
  }

  export type ProblemCreateNestedOneWithoutProblemsPlaylistInput = {
    create?: XOR<ProblemCreateWithoutProblemsPlaylistInput, ProblemUncheckedCreateWithoutProblemsPlaylistInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutProblemsPlaylistInput
    connect?: ProblemWhereUniqueInput
  }

  export type PlaylistUpdateOneRequiredWithoutProblemsNestedInput = {
    create?: XOR<PlaylistCreateWithoutProblemsInput, PlaylistUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutProblemsInput
    upsert?: PlaylistUpsertWithoutProblemsInput
    connect?: PlaylistWhereUniqueInput
    update?: XOR<XOR<PlaylistUpdateToOneWithWhereWithoutProblemsInput, PlaylistUpdateWithoutProblemsInput>, PlaylistUncheckedUpdateWithoutProblemsInput>
  }

  export type ProblemUpdateOneRequiredWithoutProblemsPlaylistNestedInput = {
    create?: XOR<ProblemCreateWithoutProblemsPlaylistInput, ProblemUncheckedCreateWithoutProblemsPlaylistInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutProblemsPlaylistInput
    upsert?: ProblemUpsertWithoutProblemsPlaylistInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutProblemsPlaylistInput, ProblemUpdateWithoutProblemsPlaylistInput>, ProblemUncheckedUpdateWithoutProblemsPlaylistInput>
  }

  export type UserCreateNestedOneWithoutRevisionInput = {
    create?: XOR<UserCreateWithoutRevisionInput, UserUncheckedCreateWithoutRevisionInput>
    connectOrCreate?: UserCreateOrConnectWithoutRevisionInput
    connect?: UserWhereUniqueInput
  }

  export type ProblemCreateNestedOneWithoutRevisionInput = {
    create?: XOR<ProblemCreateWithoutRevisionInput, ProblemUncheckedCreateWithoutRevisionInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutRevisionInput
    connect?: ProblemWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRevisionNestedInput = {
    create?: XOR<UserCreateWithoutRevisionInput, UserUncheckedCreateWithoutRevisionInput>
    connectOrCreate?: UserCreateOrConnectWithoutRevisionInput
    upsert?: UserUpsertWithoutRevisionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRevisionInput, UserUpdateWithoutRevisionInput>, UserUncheckedUpdateWithoutRevisionInput>
  }

  export type ProblemUpdateOneRequiredWithoutRevisionNestedInput = {
    create?: XOR<ProblemCreateWithoutRevisionInput, ProblemUncheckedCreateWithoutRevisionInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutRevisionInput
    upsert?: ProblemUpsertWithoutRevisionInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutRevisionInput, ProblemUpdateWithoutRevisionInput>, ProblemUncheckedUpdateWithoutRevisionInput>
  }

  export type ProblemCreateNestedOneWithoutDiscussionsInput = {
    create?: XOR<ProblemCreateWithoutDiscussionsInput, ProblemUncheckedCreateWithoutDiscussionsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutDiscussionsInput
    connect?: ProblemWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDiscussionsInput = {
    create?: XOR<UserCreateWithoutDiscussionsInput, UserUncheckedCreateWithoutDiscussionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiscussionsInput
    connect?: UserWhereUniqueInput
  }

  export type DiscussionCreateNestedOneWithoutRepliesInput = {
    create?: XOR<DiscussionCreateWithoutRepliesInput, DiscussionUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: DiscussionCreateOrConnectWithoutRepliesInput
    connect?: DiscussionWhereUniqueInput
  }

  export type DiscussionCreateNestedManyWithoutParentInput = {
    create?: XOR<DiscussionCreateWithoutParentInput, DiscussionUncheckedCreateWithoutParentInput> | DiscussionCreateWithoutParentInput[] | DiscussionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutParentInput | DiscussionCreateOrConnectWithoutParentInput[]
    createMany?: DiscussionCreateManyParentInputEnvelope
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
  }

  export type DiscussionLikeCreateNestedManyWithoutDiscussionInput = {
    create?: XOR<DiscussionLikeCreateWithoutDiscussionInput, DiscussionLikeUncheckedCreateWithoutDiscussionInput> | DiscussionLikeCreateWithoutDiscussionInput[] | DiscussionLikeUncheckedCreateWithoutDiscussionInput[]
    connectOrCreate?: DiscussionLikeCreateOrConnectWithoutDiscussionInput | DiscussionLikeCreateOrConnectWithoutDiscussionInput[]
    createMany?: DiscussionLikeCreateManyDiscussionInputEnvelope
    connect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
  }

  export type DiscussionUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<DiscussionCreateWithoutParentInput, DiscussionUncheckedCreateWithoutParentInput> | DiscussionCreateWithoutParentInput[] | DiscussionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutParentInput | DiscussionCreateOrConnectWithoutParentInput[]
    createMany?: DiscussionCreateManyParentInputEnvelope
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
  }

  export type DiscussionLikeUncheckedCreateNestedManyWithoutDiscussionInput = {
    create?: XOR<DiscussionLikeCreateWithoutDiscussionInput, DiscussionLikeUncheckedCreateWithoutDiscussionInput> | DiscussionLikeCreateWithoutDiscussionInput[] | DiscussionLikeUncheckedCreateWithoutDiscussionInput[]
    connectOrCreate?: DiscussionLikeCreateOrConnectWithoutDiscussionInput | DiscussionLikeCreateOrConnectWithoutDiscussionInput[]
    createMany?: DiscussionLikeCreateManyDiscussionInputEnvelope
    connect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
  }

  export type ProblemUpdateOneRequiredWithoutDiscussionsNestedInput = {
    create?: XOR<ProblemCreateWithoutDiscussionsInput, ProblemUncheckedCreateWithoutDiscussionsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutDiscussionsInput
    upsert?: ProblemUpsertWithoutDiscussionsInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutDiscussionsInput, ProblemUpdateWithoutDiscussionsInput>, ProblemUncheckedUpdateWithoutDiscussionsInput>
  }

  export type UserUpdateOneRequiredWithoutDiscussionsNestedInput = {
    create?: XOR<UserCreateWithoutDiscussionsInput, UserUncheckedCreateWithoutDiscussionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiscussionsInput
    upsert?: UserUpsertWithoutDiscussionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDiscussionsInput, UserUpdateWithoutDiscussionsInput>, UserUncheckedUpdateWithoutDiscussionsInput>
  }

  export type DiscussionUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<DiscussionCreateWithoutRepliesInput, DiscussionUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: DiscussionCreateOrConnectWithoutRepliesInput
    upsert?: DiscussionUpsertWithoutRepliesInput
    disconnect?: DiscussionWhereInput | boolean
    delete?: DiscussionWhereInput | boolean
    connect?: DiscussionWhereUniqueInput
    update?: XOR<XOR<DiscussionUpdateToOneWithWhereWithoutRepliesInput, DiscussionUpdateWithoutRepliesInput>, DiscussionUncheckedUpdateWithoutRepliesInput>
  }

  export type DiscussionUpdateManyWithoutParentNestedInput = {
    create?: XOR<DiscussionCreateWithoutParentInput, DiscussionUncheckedCreateWithoutParentInput> | DiscussionCreateWithoutParentInput[] | DiscussionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutParentInput | DiscussionCreateOrConnectWithoutParentInput[]
    upsert?: DiscussionUpsertWithWhereUniqueWithoutParentInput | DiscussionUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: DiscussionCreateManyParentInputEnvelope
    set?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    disconnect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    delete?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    update?: DiscussionUpdateWithWhereUniqueWithoutParentInput | DiscussionUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: DiscussionUpdateManyWithWhereWithoutParentInput | DiscussionUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: DiscussionScalarWhereInput | DiscussionScalarWhereInput[]
  }

  export type DiscussionLikeUpdateManyWithoutDiscussionNestedInput = {
    create?: XOR<DiscussionLikeCreateWithoutDiscussionInput, DiscussionLikeUncheckedCreateWithoutDiscussionInput> | DiscussionLikeCreateWithoutDiscussionInput[] | DiscussionLikeUncheckedCreateWithoutDiscussionInput[]
    connectOrCreate?: DiscussionLikeCreateOrConnectWithoutDiscussionInput | DiscussionLikeCreateOrConnectWithoutDiscussionInput[]
    upsert?: DiscussionLikeUpsertWithWhereUniqueWithoutDiscussionInput | DiscussionLikeUpsertWithWhereUniqueWithoutDiscussionInput[]
    createMany?: DiscussionLikeCreateManyDiscussionInputEnvelope
    set?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    disconnect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    delete?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    connect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    update?: DiscussionLikeUpdateWithWhereUniqueWithoutDiscussionInput | DiscussionLikeUpdateWithWhereUniqueWithoutDiscussionInput[]
    updateMany?: DiscussionLikeUpdateManyWithWhereWithoutDiscussionInput | DiscussionLikeUpdateManyWithWhereWithoutDiscussionInput[]
    deleteMany?: DiscussionLikeScalarWhereInput | DiscussionLikeScalarWhereInput[]
  }

  export type DiscussionUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<DiscussionCreateWithoutParentInput, DiscussionUncheckedCreateWithoutParentInput> | DiscussionCreateWithoutParentInput[] | DiscussionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DiscussionCreateOrConnectWithoutParentInput | DiscussionCreateOrConnectWithoutParentInput[]
    upsert?: DiscussionUpsertWithWhereUniqueWithoutParentInput | DiscussionUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: DiscussionCreateManyParentInputEnvelope
    set?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    disconnect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    delete?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    connect?: DiscussionWhereUniqueInput | DiscussionWhereUniqueInput[]
    update?: DiscussionUpdateWithWhereUniqueWithoutParentInput | DiscussionUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: DiscussionUpdateManyWithWhereWithoutParentInput | DiscussionUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: DiscussionScalarWhereInput | DiscussionScalarWhereInput[]
  }

  export type DiscussionLikeUncheckedUpdateManyWithoutDiscussionNestedInput = {
    create?: XOR<DiscussionLikeCreateWithoutDiscussionInput, DiscussionLikeUncheckedCreateWithoutDiscussionInput> | DiscussionLikeCreateWithoutDiscussionInput[] | DiscussionLikeUncheckedCreateWithoutDiscussionInput[]
    connectOrCreate?: DiscussionLikeCreateOrConnectWithoutDiscussionInput | DiscussionLikeCreateOrConnectWithoutDiscussionInput[]
    upsert?: DiscussionLikeUpsertWithWhereUniqueWithoutDiscussionInput | DiscussionLikeUpsertWithWhereUniqueWithoutDiscussionInput[]
    createMany?: DiscussionLikeCreateManyDiscussionInputEnvelope
    set?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    disconnect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    delete?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    connect?: DiscussionLikeWhereUniqueInput | DiscussionLikeWhereUniqueInput[]
    update?: DiscussionLikeUpdateWithWhereUniqueWithoutDiscussionInput | DiscussionLikeUpdateWithWhereUniqueWithoutDiscussionInput[]
    updateMany?: DiscussionLikeUpdateManyWithWhereWithoutDiscussionInput | DiscussionLikeUpdateManyWithWhereWithoutDiscussionInput[]
    deleteMany?: DiscussionLikeScalarWhereInput | DiscussionLikeScalarWhereInput[]
  }

  export type DiscussionCreateNestedOneWithoutLikesInput = {
    create?: XOR<DiscussionCreateWithoutLikesInput, DiscussionUncheckedCreateWithoutLikesInput>
    connectOrCreate?: DiscussionCreateOrConnectWithoutLikesInput
    connect?: DiscussionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDiscussionLikesInput = {
    create?: XOR<UserCreateWithoutDiscussionLikesInput, UserUncheckedCreateWithoutDiscussionLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiscussionLikesInput
    connect?: UserWhereUniqueInput
  }

  export type DiscussionUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<DiscussionCreateWithoutLikesInput, DiscussionUncheckedCreateWithoutLikesInput>
    connectOrCreate?: DiscussionCreateOrConnectWithoutLikesInput
    upsert?: DiscussionUpsertWithoutLikesInput
    connect?: DiscussionWhereUniqueInput
    update?: XOR<XOR<DiscussionUpdateToOneWithWhereWithoutLikesInput, DiscussionUpdateWithoutLikesInput>, DiscussionUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateOneRequiredWithoutDiscussionLikesNestedInput = {
    create?: XOR<UserCreateWithoutDiscussionLikesInput, UserUncheckedCreateWithoutDiscussionLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiscussionLikesInput
    upsert?: UserUpsertWithoutDiscussionLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDiscussionLikesInput, UserUpdateWithoutDiscussionLikesInput>, UserUncheckedUpdateWithoutDiscussionLikesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProblemCreateWithoutUserInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission?: SubmissionCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistCreateNestedManyWithoutProblemInput
    discussions?: DiscussionCreateNestedManyWithoutProblemInput
    Revision?: RevisionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutUserInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedUncheckedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistUncheckedCreateNestedManyWithoutProblemInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutProblemInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutUserInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutUserInput, ProblemUncheckedCreateWithoutUserInput>
  }

  export type ProblemCreateManyUserInputEnvelope = {
    data: ProblemCreateManyUserInput | ProblemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubmissionCreateWithoutUserInput = {
    id?: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutSubmissionInput
    testCases?: TestCaseResultCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    problemId: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testCases?: TestCaseResultUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionCreateOrConnectWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionCreateManyUserInputEnvelope = {
    data: SubmissionCreateManyUserInput | SubmissionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProblemSolvedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutSolvedByInput
  }

  export type ProblemSolvedUncheckedCreateWithoutUserInput = {
    id?: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemSolvedCreateOrConnectWithoutUserInput = {
    where: ProblemSolvedWhereUniqueInput
    create: XOR<ProblemSolvedCreateWithoutUserInput, ProblemSolvedUncheckedCreateWithoutUserInput>
  }

  export type ProblemSolvedCreateManyUserInputEnvelope = {
    data: ProblemSolvedCreateManyUserInput | ProblemSolvedCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PlaylistCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    problems?: ProblemPlaylistCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    problems?: ProblemPlaylistUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistCreateOrConnectWithoutUserInput = {
    where: PlaylistWhereUniqueInput
    create: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput>
  }

  export type PlaylistCreateManyUserInputEnvelope = {
    data: PlaylistCreateManyUserInput | PlaylistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DiscussionCreateWithoutAuthorInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutDiscussionsInput
    parent?: DiscussionCreateNestedOneWithoutRepliesInput
    replies?: DiscussionCreateNestedManyWithoutParentInput
    likes?: DiscussionLikeCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionUncheckedCreateWithoutAuthorInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problemId: string
    parentId?: string | null
    replies?: DiscussionUncheckedCreateNestedManyWithoutParentInput
    likes?: DiscussionLikeUncheckedCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionCreateOrConnectWithoutAuthorInput = {
    where: DiscussionWhereUniqueInput
    create: XOR<DiscussionCreateWithoutAuthorInput, DiscussionUncheckedCreateWithoutAuthorInput>
  }

  export type DiscussionCreateManyAuthorInputEnvelope = {
    data: DiscussionCreateManyAuthorInput | DiscussionCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type DiscussionLikeCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    discussion: DiscussionCreateNestedOneWithoutLikesInput
  }

  export type DiscussionLikeUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    discussionId: string
  }

  export type DiscussionLikeCreateOrConnectWithoutUserInput = {
    where: DiscussionLikeWhereUniqueInput
    create: XOR<DiscussionLikeCreateWithoutUserInput, DiscussionLikeUncheckedCreateWithoutUserInput>
  }

  export type DiscussionLikeCreateManyUserInputEnvelope = {
    data: DiscussionLikeCreateManyUserInput | DiscussionLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RevisionCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutRevisionInput
  }

  export type RevisionUncheckedCreateWithoutUserInput = {
    id?: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RevisionCreateOrConnectWithoutUserInput = {
    where: RevisionWhereUniqueInput
    create: XOR<RevisionCreateWithoutUserInput, RevisionUncheckedCreateWithoutUserInput>
  }

  export type RevisionCreateManyUserInputEnvelope = {
    data: RevisionCreateManyUserInput | RevisionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProblemUpsertWithWhereUniqueWithoutUserInput = {
    where: ProblemWhereUniqueInput
    update: XOR<ProblemUpdateWithoutUserInput, ProblemUncheckedUpdateWithoutUserInput>
    create: XOR<ProblemCreateWithoutUserInput, ProblemUncheckedCreateWithoutUserInput>
  }

  export type ProblemUpdateWithWhereUniqueWithoutUserInput = {
    where: ProblemWhereUniqueInput
    data: XOR<ProblemUpdateWithoutUserInput, ProblemUncheckedUpdateWithoutUserInput>
  }

  export type ProblemUpdateManyWithWhereWithoutUserInput = {
    where: ProblemScalarWhereInput
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyWithoutUserInput>
  }

  export type ProblemScalarWhereInput = {
    AND?: ProblemScalarWhereInput | ProblemScalarWhereInput[]
    OR?: ProblemScalarWhereInput[]
    NOT?: ProblemScalarWhereInput | ProblemScalarWhereInput[]
    id?: StringFilter<"Problem"> | string
    leetcodeId?: IntNullableFilter<"Problem"> | number | null
    title?: StringFilter<"Problem"> | string
    description?: StringFilter<"Problem"> | string
    difficulty?: EnumDifficultyFilter<"Problem"> | $Enums.Difficulty
    isPremium?: BoolFilter<"Problem"> | boolean
    solutionLink?: StringNullableFilter<"Problem"> | string | null
    acceptanceRate?: FloatNullableFilter<"Problem"> | number | null
    frequency?: FloatNullableFilter<"Problem"> | number | null
    url?: StringNullableFilter<"Problem"> | string | null
    discussCount?: IntNullableFilter<"Problem"> | number | null
    accepted?: IntNullableFilter<"Problem"> | number | null
    submissions?: IntNullableFilter<"Problem"> | number | null
    companies?: StringNullableListFilter<"Problem">
    relatedTopics?: StringNullableListFilter<"Problem">
    likes?: IntNullableFilter<"Problem"> | number | null
    dislikes?: IntNullableFilter<"Problem"> | number | null
    rating?: FloatNullableFilter<"Problem"> | number | null
    askedByFaang?: BoolFilter<"Problem"> | boolean
    similarQuestions?: StringNullableFilter<"Problem"> | string | null
    tags?: StringNullableListFilter<"Problem">
    companyTags?: StringNullableListFilter<"Problem">
    userId?: StringNullableFilter<"Problem"> | string | null
    examples?: JsonNullableFilter<"Problem">
    constraints?: StringNullableFilter<"Problem"> | string | null
    hints?: StringNullableFilter<"Problem"> | string | null
    editorial?: StringNullableFilter<"Problem"> | string | null
    testcases?: JsonNullableFilter<"Problem">
    codeSnippets?: JsonNullableFilter<"Problem">
    referenceSolutions?: JsonNullableFilter<"Problem">
    createdAt?: DateTimeFilter<"Problem"> | Date | string
    updatedAt?: DateTimeFilter<"Problem"> | Date | string
  }

  export type SubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutUserInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: StringFilter<"Submission"> | string
    problemId?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    sourceCode?: JsonFilter<"Submission">
    language?: StringFilter<"Submission"> | string
    stdin?: StringNullableFilter<"Submission"> | string | null
    stdout?: StringNullableFilter<"Submission"> | string | null
    stderr?: StringNullableFilter<"Submission"> | string | null
    compileOutput?: StringNullableFilter<"Submission"> | string | null
    status?: StringFilter<"Submission"> | string
    memory?: StringNullableFilter<"Submission"> | string | null
    time?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
  }

  export type ProblemSolvedUpsertWithWhereUniqueWithoutUserInput = {
    where: ProblemSolvedWhereUniqueInput
    update: XOR<ProblemSolvedUpdateWithoutUserInput, ProblemSolvedUncheckedUpdateWithoutUserInput>
    create: XOR<ProblemSolvedCreateWithoutUserInput, ProblemSolvedUncheckedCreateWithoutUserInput>
  }

  export type ProblemSolvedUpdateWithWhereUniqueWithoutUserInput = {
    where: ProblemSolvedWhereUniqueInput
    data: XOR<ProblemSolvedUpdateWithoutUserInput, ProblemSolvedUncheckedUpdateWithoutUserInput>
  }

  export type ProblemSolvedUpdateManyWithWhereWithoutUserInput = {
    where: ProblemSolvedScalarWhereInput
    data: XOR<ProblemSolvedUpdateManyMutationInput, ProblemSolvedUncheckedUpdateManyWithoutUserInput>
  }

  export type ProblemSolvedScalarWhereInput = {
    AND?: ProblemSolvedScalarWhereInput | ProblemSolvedScalarWhereInput[]
    OR?: ProblemSolvedScalarWhereInput[]
    NOT?: ProblemSolvedScalarWhereInput | ProblemSolvedScalarWhereInput[]
    id?: StringFilter<"ProblemSolved"> | string
    userId?: StringFilter<"ProblemSolved"> | string
    problemId?: StringFilter<"ProblemSolved"> | string
    createdAt?: DateTimeFilter<"ProblemSolved"> | Date | string
    updatedAt?: DateTimeFilter<"ProblemSolved"> | Date | string
  }

  export type PlaylistUpsertWithWhereUniqueWithoutUserInput = {
    where: PlaylistWhereUniqueInput
    update: XOR<PlaylistUpdateWithoutUserInput, PlaylistUncheckedUpdateWithoutUserInput>
    create: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput>
  }

  export type PlaylistUpdateWithWhereUniqueWithoutUserInput = {
    where: PlaylistWhereUniqueInput
    data: XOR<PlaylistUpdateWithoutUserInput, PlaylistUncheckedUpdateWithoutUserInput>
  }

  export type PlaylistUpdateManyWithWhereWithoutUserInput = {
    where: PlaylistScalarWhereInput
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyWithoutUserInput>
  }

  export type PlaylistScalarWhereInput = {
    AND?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
    OR?: PlaylistScalarWhereInput[]
    NOT?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
    id?: StringFilter<"Playlist"> | string
    name?: StringFilter<"Playlist"> | string
    description?: StringNullableFilter<"Playlist"> | string | null
    createdAt?: DateTimeFilter<"Playlist"> | Date | string
    updatedAt?: DateTimeFilter<"Playlist"> | Date | string
    userId?: StringFilter<"Playlist"> | string
  }

  export type DiscussionUpsertWithWhereUniqueWithoutAuthorInput = {
    where: DiscussionWhereUniqueInput
    update: XOR<DiscussionUpdateWithoutAuthorInput, DiscussionUncheckedUpdateWithoutAuthorInput>
    create: XOR<DiscussionCreateWithoutAuthorInput, DiscussionUncheckedCreateWithoutAuthorInput>
  }

  export type DiscussionUpdateWithWhereUniqueWithoutAuthorInput = {
    where: DiscussionWhereUniqueInput
    data: XOR<DiscussionUpdateWithoutAuthorInput, DiscussionUncheckedUpdateWithoutAuthorInput>
  }

  export type DiscussionUpdateManyWithWhereWithoutAuthorInput = {
    where: DiscussionScalarWhereInput
    data: XOR<DiscussionUpdateManyMutationInput, DiscussionUncheckedUpdateManyWithoutAuthorInput>
  }

  export type DiscussionScalarWhereInput = {
    AND?: DiscussionScalarWhereInput | DiscussionScalarWhereInput[]
    OR?: DiscussionScalarWhereInput[]
    NOT?: DiscussionScalarWhereInput | DiscussionScalarWhereInput[]
    id?: StringFilter<"Discussion"> | string
    content?: StringFilter<"Discussion"> | string
    createdAt?: DateTimeFilter<"Discussion"> | Date | string
    updatedAt?: DateTimeFilter<"Discussion"> | Date | string
    problemId?: StringFilter<"Discussion"> | string
    authorId?: StringFilter<"Discussion"> | string
    parentId?: StringNullableFilter<"Discussion"> | string | null
  }

  export type DiscussionLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: DiscussionLikeWhereUniqueInput
    update: XOR<DiscussionLikeUpdateWithoutUserInput, DiscussionLikeUncheckedUpdateWithoutUserInput>
    create: XOR<DiscussionLikeCreateWithoutUserInput, DiscussionLikeUncheckedCreateWithoutUserInput>
  }

  export type DiscussionLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: DiscussionLikeWhereUniqueInput
    data: XOR<DiscussionLikeUpdateWithoutUserInput, DiscussionLikeUncheckedUpdateWithoutUserInput>
  }

  export type DiscussionLikeUpdateManyWithWhereWithoutUserInput = {
    where: DiscussionLikeScalarWhereInput
    data: XOR<DiscussionLikeUpdateManyMutationInput, DiscussionLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type DiscussionLikeScalarWhereInput = {
    AND?: DiscussionLikeScalarWhereInput | DiscussionLikeScalarWhereInput[]
    OR?: DiscussionLikeScalarWhereInput[]
    NOT?: DiscussionLikeScalarWhereInput | DiscussionLikeScalarWhereInput[]
    id?: StringFilter<"DiscussionLike"> | string
    createdAt?: DateTimeFilter<"DiscussionLike"> | Date | string
    discussionId?: StringFilter<"DiscussionLike"> | string
    userId?: StringFilter<"DiscussionLike"> | string
  }

  export type RevisionUpsertWithWhereUniqueWithoutUserInput = {
    where: RevisionWhereUniqueInput
    update: XOR<RevisionUpdateWithoutUserInput, RevisionUncheckedUpdateWithoutUserInput>
    create: XOR<RevisionCreateWithoutUserInput, RevisionUncheckedCreateWithoutUserInput>
  }

  export type RevisionUpdateWithWhereUniqueWithoutUserInput = {
    where: RevisionWhereUniqueInput
    data: XOR<RevisionUpdateWithoutUserInput, RevisionUncheckedUpdateWithoutUserInput>
  }

  export type RevisionUpdateManyWithWhereWithoutUserInput = {
    where: RevisionScalarWhereInput
    data: XOR<RevisionUpdateManyMutationInput, RevisionUncheckedUpdateManyWithoutUserInput>
  }

  export type RevisionScalarWhereInput = {
    AND?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
    OR?: RevisionScalarWhereInput[]
    NOT?: RevisionScalarWhereInput | RevisionScalarWhereInput[]
    id?: StringFilter<"Revision"> | string
    userId?: StringFilter<"Revision"> | string
    problemId?: StringFilter<"Revision"> | string
    createdAt?: DateTimeFilter<"Revision"> | Date | string
    updatedAt?: DateTimeFilter<"Revision"> | Date | string
  }

  export type UserCreateWithoutProblemsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistCreateNestedManyWithoutUserInput
    discussions?: DiscussionCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeCreateNestedManyWithoutUserInput
    Revision?: RevisionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProblemsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedUncheckedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeUncheckedCreateNestedManyWithoutUserInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProblemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProblemsInput, UserUncheckedCreateWithoutProblemsInput>
  }

  export type SubmissionCreateWithoutProblemInput = {
    id?: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
    testCases?: TestCaseResultCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateWithoutProblemInput = {
    id?: string
    userId: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testCases?: TestCaseResultUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionCreateOrConnectWithoutProblemInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput>
  }

  export type SubmissionCreateManyProblemInputEnvelope = {
    data: SubmissionCreateManyProblemInput | SubmissionCreateManyProblemInput[]
    skipDuplicates?: boolean
  }

  export type ProblemSolvedCreateWithoutProblemInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSolvedProblemsInput
  }

  export type ProblemSolvedUncheckedCreateWithoutProblemInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemSolvedCreateOrConnectWithoutProblemInput = {
    where: ProblemSolvedWhereUniqueInput
    create: XOR<ProblemSolvedCreateWithoutProblemInput, ProblemSolvedUncheckedCreateWithoutProblemInput>
  }

  export type ProblemSolvedCreateManyProblemInputEnvelope = {
    data: ProblemSolvedCreateManyProblemInput | ProblemSolvedCreateManyProblemInput[]
    skipDuplicates?: boolean
  }

  export type ProblemPlaylistCreateWithoutProblemInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    playlist: PlaylistCreateNestedOneWithoutProblemsInput
  }

  export type ProblemPlaylistUncheckedCreateWithoutProblemInput = {
    id?: string
    playlistId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemPlaylistCreateOrConnectWithoutProblemInput = {
    where: ProblemPlaylistWhereUniqueInput
    create: XOR<ProblemPlaylistCreateWithoutProblemInput, ProblemPlaylistUncheckedCreateWithoutProblemInput>
  }

  export type ProblemPlaylistCreateManyProblemInputEnvelope = {
    data: ProblemPlaylistCreateManyProblemInput | ProblemPlaylistCreateManyProblemInput[]
    skipDuplicates?: boolean
  }

  export type DiscussionCreateWithoutProblemInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutDiscussionsInput
    parent?: DiscussionCreateNestedOneWithoutRepliesInput
    replies?: DiscussionCreateNestedManyWithoutParentInput
    likes?: DiscussionLikeCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionUncheckedCreateWithoutProblemInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    parentId?: string | null
    replies?: DiscussionUncheckedCreateNestedManyWithoutParentInput
    likes?: DiscussionLikeUncheckedCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionCreateOrConnectWithoutProblemInput = {
    where: DiscussionWhereUniqueInput
    create: XOR<DiscussionCreateWithoutProblemInput, DiscussionUncheckedCreateWithoutProblemInput>
  }

  export type DiscussionCreateManyProblemInputEnvelope = {
    data: DiscussionCreateManyProblemInput | DiscussionCreateManyProblemInput[]
    skipDuplicates?: boolean
  }

  export type RevisionCreateWithoutProblemInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRevisionInput
  }

  export type RevisionUncheckedCreateWithoutProblemInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RevisionCreateOrConnectWithoutProblemInput = {
    where: RevisionWhereUniqueInput
    create: XOR<RevisionCreateWithoutProblemInput, RevisionUncheckedCreateWithoutProblemInput>
  }

  export type RevisionCreateManyProblemInputEnvelope = {
    data: RevisionCreateManyProblemInput | RevisionCreateManyProblemInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProblemsInput = {
    update: XOR<UserUpdateWithoutProblemsInput, UserUncheckedUpdateWithoutProblemsInput>
    create: XOR<UserCreateWithoutProblemsInput, UserUncheckedCreateWithoutProblemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProblemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProblemsInput, UserUncheckedUpdateWithoutProblemsInput>
  }

  export type UserUpdateWithoutProblemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUpdateManyWithoutUserNestedInput
    Revision?: RevisionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProblemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUncheckedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUncheckedUpdateManyWithoutUserNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubmissionUpsertWithWhereUniqueWithoutProblemInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutProblemInput, SubmissionUncheckedUpdateWithoutProblemInput>
    create: XOR<SubmissionCreateWithoutProblemInput, SubmissionUncheckedCreateWithoutProblemInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutProblemInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutProblemInput, SubmissionUncheckedUpdateWithoutProblemInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutProblemInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutProblemInput>
  }

  export type ProblemSolvedUpsertWithWhereUniqueWithoutProblemInput = {
    where: ProblemSolvedWhereUniqueInput
    update: XOR<ProblemSolvedUpdateWithoutProblemInput, ProblemSolvedUncheckedUpdateWithoutProblemInput>
    create: XOR<ProblemSolvedCreateWithoutProblemInput, ProblemSolvedUncheckedCreateWithoutProblemInput>
  }

  export type ProblemSolvedUpdateWithWhereUniqueWithoutProblemInput = {
    where: ProblemSolvedWhereUniqueInput
    data: XOR<ProblemSolvedUpdateWithoutProblemInput, ProblemSolvedUncheckedUpdateWithoutProblemInput>
  }

  export type ProblemSolvedUpdateManyWithWhereWithoutProblemInput = {
    where: ProblemSolvedScalarWhereInput
    data: XOR<ProblemSolvedUpdateManyMutationInput, ProblemSolvedUncheckedUpdateManyWithoutProblemInput>
  }

  export type ProblemPlaylistUpsertWithWhereUniqueWithoutProblemInput = {
    where: ProblemPlaylistWhereUniqueInput
    update: XOR<ProblemPlaylistUpdateWithoutProblemInput, ProblemPlaylistUncheckedUpdateWithoutProblemInput>
    create: XOR<ProblemPlaylistCreateWithoutProblemInput, ProblemPlaylistUncheckedCreateWithoutProblemInput>
  }

  export type ProblemPlaylistUpdateWithWhereUniqueWithoutProblemInput = {
    where: ProblemPlaylistWhereUniqueInput
    data: XOR<ProblemPlaylistUpdateWithoutProblemInput, ProblemPlaylistUncheckedUpdateWithoutProblemInput>
  }

  export type ProblemPlaylistUpdateManyWithWhereWithoutProblemInput = {
    where: ProblemPlaylistScalarWhereInput
    data: XOR<ProblemPlaylistUpdateManyMutationInput, ProblemPlaylistUncheckedUpdateManyWithoutProblemInput>
  }

  export type ProblemPlaylistScalarWhereInput = {
    AND?: ProblemPlaylistScalarWhereInput | ProblemPlaylistScalarWhereInput[]
    OR?: ProblemPlaylistScalarWhereInput[]
    NOT?: ProblemPlaylistScalarWhereInput | ProblemPlaylistScalarWhereInput[]
    id?: StringFilter<"ProblemPlaylist"> | string
    problemId?: StringFilter<"ProblemPlaylist"> | string
    playlistId?: StringFilter<"ProblemPlaylist"> | string
    createdAt?: DateTimeFilter<"ProblemPlaylist"> | Date | string
    updatedAt?: DateTimeFilter<"ProblemPlaylist"> | Date | string
  }

  export type DiscussionUpsertWithWhereUniqueWithoutProblemInput = {
    where: DiscussionWhereUniqueInput
    update: XOR<DiscussionUpdateWithoutProblemInput, DiscussionUncheckedUpdateWithoutProblemInput>
    create: XOR<DiscussionCreateWithoutProblemInput, DiscussionUncheckedCreateWithoutProblemInput>
  }

  export type DiscussionUpdateWithWhereUniqueWithoutProblemInput = {
    where: DiscussionWhereUniqueInput
    data: XOR<DiscussionUpdateWithoutProblemInput, DiscussionUncheckedUpdateWithoutProblemInput>
  }

  export type DiscussionUpdateManyWithWhereWithoutProblemInput = {
    where: DiscussionScalarWhereInput
    data: XOR<DiscussionUpdateManyMutationInput, DiscussionUncheckedUpdateManyWithoutProblemInput>
  }

  export type RevisionUpsertWithWhereUniqueWithoutProblemInput = {
    where: RevisionWhereUniqueInput
    update: XOR<RevisionUpdateWithoutProblemInput, RevisionUncheckedUpdateWithoutProblemInput>
    create: XOR<RevisionCreateWithoutProblemInput, RevisionUncheckedCreateWithoutProblemInput>
  }

  export type RevisionUpdateWithWhereUniqueWithoutProblemInput = {
    where: RevisionWhereUniqueInput
    data: XOR<RevisionUpdateWithoutProblemInput, RevisionUncheckedUpdateWithoutProblemInput>
  }

  export type RevisionUpdateManyWithWhereWithoutProblemInput = {
    where: RevisionScalarWhereInput
    data: XOR<RevisionUpdateManyMutationInput, RevisionUncheckedUpdateManyWithoutProblemInput>
  }

  export type ProblemCreateWithoutSubmissionInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProblemsInput
    solvedBy?: ProblemSolvedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistCreateNestedManyWithoutProblemInput
    discussions?: DiscussionCreateNestedManyWithoutProblemInput
    Revision?: RevisionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutSubmissionInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    userId?: string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    solvedBy?: ProblemSolvedUncheckedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistUncheckedCreateNestedManyWithoutProblemInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutProblemInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutSubmissionInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutSubmissionInput, ProblemUncheckedCreateWithoutSubmissionInput>
  }

  export type UserCreateWithoutSubmissionsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistCreateNestedManyWithoutUserInput
    discussions?: DiscussionCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeCreateNestedManyWithoutUserInput
    Revision?: RevisionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemUncheckedCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedUncheckedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeUncheckedCreateNestedManyWithoutUserInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type TestCaseResultCreateWithoutSubmissionInput = {
    id?: string
    testCase: number
    passed: boolean
    stdout?: string | null
    expected?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestCaseResultUncheckedCreateWithoutSubmissionInput = {
    id?: string
    testCase: number
    passed: boolean
    stdout?: string | null
    expected?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestCaseResultCreateOrConnectWithoutSubmissionInput = {
    where: TestCaseResultWhereUniqueInput
    create: XOR<TestCaseResultCreateWithoutSubmissionInput, TestCaseResultUncheckedCreateWithoutSubmissionInput>
  }

  export type TestCaseResultCreateManySubmissionInputEnvelope = {
    data: TestCaseResultCreateManySubmissionInput | TestCaseResultCreateManySubmissionInput[]
    skipDuplicates?: boolean
  }

  export type ProblemUpsertWithoutSubmissionInput = {
    update: XOR<ProblemUpdateWithoutSubmissionInput, ProblemUncheckedUpdateWithoutSubmissionInput>
    create: XOR<ProblemCreateWithoutSubmissionInput, ProblemUncheckedCreateWithoutSubmissionInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutSubmissionInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutSubmissionInput, ProblemUncheckedUpdateWithoutSubmissionInput>
  }

  export type ProblemUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProblemsNestedInput
    solvedBy?: ProblemSolvedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    solvedBy?: ProblemSolvedUncheckedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUncheckedUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUpdateManyWithoutUserNestedInput
    Revision?: RevisionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUncheckedUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUncheckedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUncheckedUpdateManyWithoutUserNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TestCaseResultUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: TestCaseResultWhereUniqueInput
    update: XOR<TestCaseResultUpdateWithoutSubmissionInput, TestCaseResultUncheckedUpdateWithoutSubmissionInput>
    create: XOR<TestCaseResultCreateWithoutSubmissionInput, TestCaseResultUncheckedCreateWithoutSubmissionInput>
  }

  export type TestCaseResultUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: TestCaseResultWhereUniqueInput
    data: XOR<TestCaseResultUpdateWithoutSubmissionInput, TestCaseResultUncheckedUpdateWithoutSubmissionInput>
  }

  export type TestCaseResultUpdateManyWithWhereWithoutSubmissionInput = {
    where: TestCaseResultScalarWhereInput
    data: XOR<TestCaseResultUpdateManyMutationInput, TestCaseResultUncheckedUpdateManyWithoutSubmissionInput>
  }

  export type TestCaseResultScalarWhereInput = {
    AND?: TestCaseResultScalarWhereInput | TestCaseResultScalarWhereInput[]
    OR?: TestCaseResultScalarWhereInput[]
    NOT?: TestCaseResultScalarWhereInput | TestCaseResultScalarWhereInput[]
    id?: StringFilter<"TestCaseResult"> | string
    submissionId?: StringFilter<"TestCaseResult"> | string
    testCase?: IntFilter<"TestCaseResult"> | number
    passed?: BoolFilter<"TestCaseResult"> | boolean
    stdout?: StringNullableFilter<"TestCaseResult"> | string | null
    expected?: StringNullableFilter<"TestCaseResult"> | string | null
    stderr?: StringNullableFilter<"TestCaseResult"> | string | null
    compileOutput?: StringNullableFilter<"TestCaseResult"> | string | null
    status?: StringFilter<"TestCaseResult"> | string
    memory?: StringNullableFilter<"TestCaseResult"> | string | null
    time?: StringNullableFilter<"TestCaseResult"> | string | null
    createdAt?: DateTimeFilter<"TestCaseResult"> | Date | string
    updatedAt?: DateTimeFilter<"TestCaseResult"> | Date | string
  }

  export type SubmissionCreateWithoutTestCasesInput = {
    id?: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutSubmissionInput
    user: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutTestCasesInput = {
    id?: string
    problemId: string
    userId: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutTestCasesInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutTestCasesInput, SubmissionUncheckedCreateWithoutTestCasesInput>
  }

  export type SubmissionUpsertWithoutTestCasesInput = {
    update: XOR<SubmissionUpdateWithoutTestCasesInput, SubmissionUncheckedUpdateWithoutTestCasesInput>
    create: XOR<SubmissionCreateWithoutTestCasesInput, SubmissionUncheckedCreateWithoutTestCasesInput>
    where?: SubmissionWhereInput
  }

  export type SubmissionUpdateToOneWithWhereWithoutTestCasesInput = {
    where?: SubmissionWhereInput
    data: XOR<SubmissionUpdateWithoutTestCasesInput, SubmissionUncheckedUpdateWithoutTestCasesInput>
  }

  export type SubmissionUpdateWithoutTestCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutSubmissionNestedInput
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutTestCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemCreateWithoutSolvedByInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProblemsInput
    submission?: SubmissionCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistCreateNestedManyWithoutProblemInput
    discussions?: DiscussionCreateNestedManyWithoutProblemInput
    Revision?: RevisionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutSolvedByInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    userId?: string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistUncheckedCreateNestedManyWithoutProblemInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutProblemInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutSolvedByInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutSolvedByInput, ProblemUncheckedCreateWithoutSolvedByInput>
  }

  export type UserCreateWithoutSolvedProblemsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    Playlists?: PlaylistCreateNestedManyWithoutUserInput
    discussions?: DiscussionCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeCreateNestedManyWithoutUserInput
    Revision?: RevisionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSolvedProblemsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeUncheckedCreateNestedManyWithoutUserInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSolvedProblemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSolvedProblemsInput, UserUncheckedCreateWithoutSolvedProblemsInput>
  }

  export type ProblemUpsertWithoutSolvedByInput = {
    update: XOR<ProblemUpdateWithoutSolvedByInput, ProblemUncheckedUpdateWithoutSolvedByInput>
    create: XOR<ProblemCreateWithoutSolvedByInput, ProblemUncheckedCreateWithoutSolvedByInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutSolvedByInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutSolvedByInput, ProblemUncheckedUpdateWithoutSolvedByInput>
  }

  export type ProblemUpdateWithoutSolvedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProblemsNestedInput
    submission?: SubmissionUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutSolvedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUncheckedUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type UserUpsertWithoutSolvedProblemsInput = {
    update: XOR<UserUpdateWithoutSolvedProblemsInput, UserUncheckedUpdateWithoutSolvedProblemsInput>
    create: XOR<UserCreateWithoutSolvedProblemsInput, UserUncheckedCreateWithoutSolvedProblemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSolvedProblemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSolvedProblemsInput, UserUncheckedUpdateWithoutSolvedProblemsInput>
  }

  export type UserUpdateWithoutSolvedProblemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUpdateManyWithoutUserNestedInput
    Revision?: RevisionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSolvedProblemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUncheckedUpdateManyWithoutUserNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProblemPlaylistCreateWithoutPlaylistInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutProblemsPlaylistInput
  }

  export type ProblemPlaylistUncheckedCreateWithoutPlaylistInput = {
    id?: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemPlaylistCreateOrConnectWithoutPlaylistInput = {
    where: ProblemPlaylistWhereUniqueInput
    create: XOR<ProblemPlaylistCreateWithoutPlaylistInput, ProblemPlaylistUncheckedCreateWithoutPlaylistInput>
  }

  export type ProblemPlaylistCreateManyPlaylistInputEnvelope = {
    data: ProblemPlaylistCreateManyPlaylistInput | ProblemPlaylistCreateManyPlaylistInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutPlaylistsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedCreateNestedManyWithoutUserInput
    discussions?: DiscussionCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeCreateNestedManyWithoutUserInput
    Revision?: RevisionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPlaylistsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedUncheckedCreateNestedManyWithoutUserInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeUncheckedCreateNestedManyWithoutUserInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPlaylistsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
  }

  export type ProblemPlaylistUpsertWithWhereUniqueWithoutPlaylistInput = {
    where: ProblemPlaylistWhereUniqueInput
    update: XOR<ProblemPlaylistUpdateWithoutPlaylistInput, ProblemPlaylistUncheckedUpdateWithoutPlaylistInput>
    create: XOR<ProblemPlaylistCreateWithoutPlaylistInput, ProblemPlaylistUncheckedCreateWithoutPlaylistInput>
  }

  export type ProblemPlaylistUpdateWithWhereUniqueWithoutPlaylistInput = {
    where: ProblemPlaylistWhereUniqueInput
    data: XOR<ProblemPlaylistUpdateWithoutPlaylistInput, ProblemPlaylistUncheckedUpdateWithoutPlaylistInput>
  }

  export type ProblemPlaylistUpdateManyWithWhereWithoutPlaylistInput = {
    where: ProblemPlaylistScalarWhereInput
    data: XOR<ProblemPlaylistUpdateManyMutationInput, ProblemPlaylistUncheckedUpdateManyWithoutPlaylistInput>
  }

  export type UserUpsertWithoutPlaylistsInput = {
    update: XOR<UserUpdateWithoutPlaylistsInput, UserUncheckedUpdateWithoutPlaylistsInput>
    create: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlaylistsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlaylistsInput, UserUncheckedUpdateWithoutPlaylistsInput>
  }

  export type UserUpdateWithoutPlaylistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUpdateManyWithoutUserNestedInput
    Revision?: RevisionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPlaylistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUncheckedUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUncheckedUpdateManyWithoutUserNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PlaylistCreateWithoutProblemsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlaylistsInput
  }

  export type PlaylistUncheckedCreateWithoutProblemsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type PlaylistCreateOrConnectWithoutProblemsInput = {
    where: PlaylistWhereUniqueInput
    create: XOR<PlaylistCreateWithoutProblemsInput, PlaylistUncheckedCreateWithoutProblemsInput>
  }

  export type ProblemCreateWithoutProblemsPlaylistInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProblemsInput
    submission?: SubmissionCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedCreateNestedManyWithoutProblemInput
    discussions?: DiscussionCreateNestedManyWithoutProblemInput
    Revision?: RevisionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutProblemsPlaylistInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    userId?: string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedUncheckedCreateNestedManyWithoutProblemInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutProblemInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutProblemsPlaylistInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutProblemsPlaylistInput, ProblemUncheckedCreateWithoutProblemsPlaylistInput>
  }

  export type PlaylistUpsertWithoutProblemsInput = {
    update: XOR<PlaylistUpdateWithoutProblemsInput, PlaylistUncheckedUpdateWithoutProblemsInput>
    create: XOR<PlaylistCreateWithoutProblemsInput, PlaylistUncheckedCreateWithoutProblemsInput>
    where?: PlaylistWhereInput
  }

  export type PlaylistUpdateToOneWithWhereWithoutProblemsInput = {
    where?: PlaylistWhereInput
    data: XOR<PlaylistUpdateWithoutProblemsInput, PlaylistUncheckedUpdateWithoutProblemsInput>
  }

  export type PlaylistUpdateWithoutProblemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlaylistsNestedInput
  }

  export type PlaylistUncheckedUpdateWithoutProblemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemUpsertWithoutProblemsPlaylistInput = {
    update: XOR<ProblemUpdateWithoutProblemsPlaylistInput, ProblemUncheckedUpdateWithoutProblemsPlaylistInput>
    create: XOR<ProblemCreateWithoutProblemsPlaylistInput, ProblemUncheckedCreateWithoutProblemsPlaylistInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutProblemsPlaylistInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutProblemsPlaylistInput, ProblemUncheckedUpdateWithoutProblemsPlaylistInput>
  }

  export type ProblemUpdateWithoutProblemsPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProblemsNestedInput
    submission?: SubmissionUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutProblemsPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUncheckedUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type UserCreateWithoutRevisionInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistCreateNestedManyWithoutUserInput
    discussions?: DiscussionCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRevisionInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedUncheckedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutAuthorInput
    discussionLikes?: DiscussionLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRevisionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRevisionInput, UserUncheckedCreateWithoutRevisionInput>
  }

  export type ProblemCreateWithoutRevisionInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProblemsInput
    submission?: SubmissionCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistCreateNestedManyWithoutProblemInput
    discussions?: DiscussionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutRevisionInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    userId?: string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedUncheckedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistUncheckedCreateNestedManyWithoutProblemInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutRevisionInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutRevisionInput, ProblemUncheckedCreateWithoutRevisionInput>
  }

  export type UserUpsertWithoutRevisionInput = {
    update: XOR<UserUpdateWithoutRevisionInput, UserUncheckedUpdateWithoutRevisionInput>
    create: XOR<UserCreateWithoutRevisionInput, UserUncheckedCreateWithoutRevisionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRevisionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRevisionInput, UserUncheckedUpdateWithoutRevisionInput>
  }

  export type UserUpdateWithoutRevisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRevisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUncheckedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutAuthorNestedInput
    discussionLikes?: DiscussionLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProblemUpsertWithoutRevisionInput = {
    update: XOR<ProblemUpdateWithoutRevisionInput, ProblemUncheckedUpdateWithoutRevisionInput>
    create: XOR<ProblemCreateWithoutRevisionInput, ProblemUncheckedCreateWithoutRevisionInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutRevisionInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutRevisionInput, ProblemUncheckedUpdateWithoutRevisionInput>
  }

  export type ProblemUpdateWithoutRevisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProblemsNestedInput
    submission?: SubmissionUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutRevisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUncheckedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUncheckedUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type ProblemCreateWithoutDiscussionsInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProblemsInput
    submission?: SubmissionCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistCreateNestedManyWithoutProblemInput
    Revision?: RevisionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutDiscussionsInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    userId?: string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission?: SubmissionUncheckedCreateNestedManyWithoutProblemInput
    solvedBy?: ProblemSolvedUncheckedCreateNestedManyWithoutProblemInput
    problemsPlaylist?: ProblemPlaylistUncheckedCreateNestedManyWithoutProblemInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutDiscussionsInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutDiscussionsInput, ProblemUncheckedCreateWithoutDiscussionsInput>
  }

  export type UserCreateWithoutDiscussionsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistCreateNestedManyWithoutUserInput
    discussionLikes?: DiscussionLikeCreateNestedManyWithoutUserInput
    Revision?: RevisionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDiscussionsInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedUncheckedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    discussionLikes?: DiscussionLikeUncheckedCreateNestedManyWithoutUserInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDiscussionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDiscussionsInput, UserUncheckedCreateWithoutDiscussionsInput>
  }

  export type DiscussionCreateWithoutRepliesInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutDiscussionsInput
    author: UserCreateNestedOneWithoutDiscussionsInput
    parent?: DiscussionCreateNestedOneWithoutRepliesInput
    likes?: DiscussionLikeCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionUncheckedCreateWithoutRepliesInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problemId: string
    authorId: string
    parentId?: string | null
    likes?: DiscussionLikeUncheckedCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionCreateOrConnectWithoutRepliesInput = {
    where: DiscussionWhereUniqueInput
    create: XOR<DiscussionCreateWithoutRepliesInput, DiscussionUncheckedCreateWithoutRepliesInput>
  }

  export type DiscussionCreateWithoutParentInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutDiscussionsInput
    author: UserCreateNestedOneWithoutDiscussionsInput
    replies?: DiscussionCreateNestedManyWithoutParentInput
    likes?: DiscussionLikeCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionUncheckedCreateWithoutParentInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problemId: string
    authorId: string
    replies?: DiscussionUncheckedCreateNestedManyWithoutParentInput
    likes?: DiscussionLikeUncheckedCreateNestedManyWithoutDiscussionInput
  }

  export type DiscussionCreateOrConnectWithoutParentInput = {
    where: DiscussionWhereUniqueInput
    create: XOR<DiscussionCreateWithoutParentInput, DiscussionUncheckedCreateWithoutParentInput>
  }

  export type DiscussionCreateManyParentInputEnvelope = {
    data: DiscussionCreateManyParentInput | DiscussionCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type DiscussionLikeCreateWithoutDiscussionInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutDiscussionLikesInput
  }

  export type DiscussionLikeUncheckedCreateWithoutDiscussionInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type DiscussionLikeCreateOrConnectWithoutDiscussionInput = {
    where: DiscussionLikeWhereUniqueInput
    create: XOR<DiscussionLikeCreateWithoutDiscussionInput, DiscussionLikeUncheckedCreateWithoutDiscussionInput>
  }

  export type DiscussionLikeCreateManyDiscussionInputEnvelope = {
    data: DiscussionLikeCreateManyDiscussionInput | DiscussionLikeCreateManyDiscussionInput[]
    skipDuplicates?: boolean
  }

  export type ProblemUpsertWithoutDiscussionsInput = {
    update: XOR<ProblemUpdateWithoutDiscussionsInput, ProblemUncheckedUpdateWithoutDiscussionsInput>
    create: XOR<ProblemCreateWithoutDiscussionsInput, ProblemUncheckedCreateWithoutDiscussionsInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutDiscussionsInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutDiscussionsInput, ProblemUncheckedUpdateWithoutDiscussionsInput>
  }

  export type ProblemUpdateWithoutDiscussionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProblemsNestedInput
    submission?: SubmissionUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutDiscussionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUncheckedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUncheckedUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type UserUpsertWithoutDiscussionsInput = {
    update: XOR<UserUpdateWithoutDiscussionsInput, UserUncheckedUpdateWithoutDiscussionsInput>
    create: XOR<UserCreateWithoutDiscussionsInput, UserUncheckedCreateWithoutDiscussionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDiscussionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDiscussionsInput, UserUncheckedUpdateWithoutDiscussionsInput>
  }

  export type UserUpdateWithoutDiscussionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUpdateManyWithoutUserNestedInput
    discussionLikes?: DiscussionLikeUpdateManyWithoutUserNestedInput
    Revision?: RevisionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDiscussionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUncheckedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    discussionLikes?: DiscussionLikeUncheckedUpdateManyWithoutUserNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DiscussionUpsertWithoutRepliesInput = {
    update: XOR<DiscussionUpdateWithoutRepliesInput, DiscussionUncheckedUpdateWithoutRepliesInput>
    create: XOR<DiscussionCreateWithoutRepliesInput, DiscussionUncheckedCreateWithoutRepliesInput>
    where?: DiscussionWhereInput
  }

  export type DiscussionUpdateToOneWithWhereWithoutRepliesInput = {
    where?: DiscussionWhereInput
    data: XOR<DiscussionUpdateWithoutRepliesInput, DiscussionUncheckedUpdateWithoutRepliesInput>
  }

  export type DiscussionUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutDiscussionsNestedInput
    author?: UserUpdateOneRequiredWithoutDiscussionsNestedInput
    parent?: DiscussionUpdateOneWithoutRepliesNestedInput
    likes?: DiscussionLikeUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUncheckedUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problemId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    likes?: DiscussionLikeUncheckedUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUpsertWithWhereUniqueWithoutParentInput = {
    where: DiscussionWhereUniqueInput
    update: XOR<DiscussionUpdateWithoutParentInput, DiscussionUncheckedUpdateWithoutParentInput>
    create: XOR<DiscussionCreateWithoutParentInput, DiscussionUncheckedCreateWithoutParentInput>
  }

  export type DiscussionUpdateWithWhereUniqueWithoutParentInput = {
    where: DiscussionWhereUniqueInput
    data: XOR<DiscussionUpdateWithoutParentInput, DiscussionUncheckedUpdateWithoutParentInput>
  }

  export type DiscussionUpdateManyWithWhereWithoutParentInput = {
    where: DiscussionScalarWhereInput
    data: XOR<DiscussionUpdateManyMutationInput, DiscussionUncheckedUpdateManyWithoutParentInput>
  }

  export type DiscussionLikeUpsertWithWhereUniqueWithoutDiscussionInput = {
    where: DiscussionLikeWhereUniqueInput
    update: XOR<DiscussionLikeUpdateWithoutDiscussionInput, DiscussionLikeUncheckedUpdateWithoutDiscussionInput>
    create: XOR<DiscussionLikeCreateWithoutDiscussionInput, DiscussionLikeUncheckedCreateWithoutDiscussionInput>
  }

  export type DiscussionLikeUpdateWithWhereUniqueWithoutDiscussionInput = {
    where: DiscussionLikeWhereUniqueInput
    data: XOR<DiscussionLikeUpdateWithoutDiscussionInput, DiscussionLikeUncheckedUpdateWithoutDiscussionInput>
  }

  export type DiscussionLikeUpdateManyWithWhereWithoutDiscussionInput = {
    where: DiscussionLikeScalarWhereInput
    data: XOR<DiscussionLikeUpdateManyMutationInput, DiscussionLikeUncheckedUpdateManyWithoutDiscussionInput>
  }

  export type DiscussionCreateWithoutLikesInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problem: ProblemCreateNestedOneWithoutDiscussionsInput
    author: UserCreateNestedOneWithoutDiscussionsInput
    parent?: DiscussionCreateNestedOneWithoutRepliesInput
    replies?: DiscussionCreateNestedManyWithoutParentInput
  }

  export type DiscussionUncheckedCreateWithoutLikesInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problemId: string
    authorId: string
    parentId?: string | null
    replies?: DiscussionUncheckedCreateNestedManyWithoutParentInput
  }

  export type DiscussionCreateOrConnectWithoutLikesInput = {
    where: DiscussionWhereUniqueInput
    create: XOR<DiscussionCreateWithoutLikesInput, DiscussionUncheckedCreateWithoutLikesInput>
  }

  export type UserCreateWithoutDiscussionLikesInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistCreateNestedManyWithoutUserInput
    discussions?: DiscussionCreateNestedManyWithoutAuthorInput
    Revision?: RevisionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDiscussionLikesInput = {
    id?: string
    name?: string | null
    email: string
    image?: string | null
    role?: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    streakCount?: number
    maxStreakCount?: number
    firebaseUid?: string | null
    authProvider?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    bio?: string | null
    githubProfile?: string | null
    linkedinProfile?: string | null
    problems?: ProblemUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    solvedProblems?: ProblemSolvedUncheckedCreateNestedManyWithoutUserInput
    Playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    discussions?: DiscussionUncheckedCreateNestedManyWithoutAuthorInput
    Revision?: RevisionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDiscussionLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDiscussionLikesInput, UserUncheckedCreateWithoutDiscussionLikesInput>
  }

  export type DiscussionUpsertWithoutLikesInput = {
    update: XOR<DiscussionUpdateWithoutLikesInput, DiscussionUncheckedUpdateWithoutLikesInput>
    create: XOR<DiscussionCreateWithoutLikesInput, DiscussionUncheckedCreateWithoutLikesInput>
    where?: DiscussionWhereInput
  }

  export type DiscussionUpdateToOneWithWhereWithoutLikesInput = {
    where?: DiscussionWhereInput
    data: XOR<DiscussionUpdateWithoutLikesInput, DiscussionUncheckedUpdateWithoutLikesInput>
  }

  export type DiscussionUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutDiscussionsNestedInput
    author?: UserUpdateOneRequiredWithoutDiscussionsNestedInput
    parent?: DiscussionUpdateOneWithoutRepliesNestedInput
    replies?: DiscussionUpdateManyWithoutParentNestedInput
  }

  export type DiscussionUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problemId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: DiscussionUncheckedUpdateManyWithoutParentNestedInput
  }

  export type UserUpsertWithoutDiscussionLikesInput = {
    update: XOR<UserUpdateWithoutDiscussionLikesInput, UserUncheckedUpdateWithoutDiscussionLikesInput>
    create: XOR<UserCreateWithoutDiscussionLikesInput, UserUncheckedCreateWithoutDiscussionLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDiscussionLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDiscussionLikesInput, UserUncheckedUpdateWithoutDiscussionLikesInput>
  }

  export type UserUpdateWithoutDiscussionLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUpdateManyWithoutAuthorNestedInput
    Revision?: RevisionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDiscussionLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streakCount?: IntFieldUpdateOperationsInput | number
    maxStreakCount?: IntFieldUpdateOperationsInput | number
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    authProvider?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    githubProfile?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinProfile?: NullableStringFieldUpdateOperationsInput | string | null
    problems?: ProblemUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    solvedProblems?: ProblemSolvedUncheckedUpdateManyWithoutUserNestedInput
    Playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutAuthorNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProblemCreateManyUserInput = {
    id?: string
    leetcodeId?: number | null
    title: string
    description: string
    difficulty: $Enums.Difficulty
    isPremium?: boolean
    solutionLink?: string | null
    acceptanceRate?: number | null
    frequency?: number | null
    url?: string | null
    discussCount?: number | null
    accepted?: number | null
    submissions?: number | null
    companies?: ProblemCreatecompaniesInput | string[]
    relatedTopics?: ProblemCreaterelatedTopicsInput | string[]
    likes?: number | null
    dislikes?: number | null
    rating?: number | null
    askedByFaang?: boolean
    similarQuestions?: string | null
    tags?: ProblemCreatetagsInput | string[]
    companyTags?: ProblemCreatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: string | null
    hints?: string | null
    editorial?: string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateManyUserInput = {
    id?: string
    problemId: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemSolvedCreateManyUserInput = {
    id?: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlaylistCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiscussionCreateManyAuthorInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problemId: string
    parentId?: string | null
  }

  export type DiscussionLikeCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    discussionId: string
  }

  export type RevisionCreateManyUserInput = {
    id?: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUncheckedUpdateManyWithoutProblemNestedInput
    solvedBy?: ProblemSolvedUncheckedUpdateManyWithoutProblemNestedInput
    problemsPlaylist?: ProblemPlaylistUncheckedUpdateManyWithoutProblemNestedInput
    discussions?: DiscussionUncheckedUpdateManyWithoutProblemNestedInput
    Revision?: RevisionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    solutionLink?: NullableStringFieldUpdateOperationsInput | string | null
    acceptanceRate?: NullableFloatFieldUpdateOperationsInput | number | null
    frequency?: NullableFloatFieldUpdateOperationsInput | number | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    discussCount?: NullableIntFieldUpdateOperationsInput | number | null
    accepted?: NullableIntFieldUpdateOperationsInput | number | null
    submissions?: NullableIntFieldUpdateOperationsInput | number | null
    companies?: ProblemUpdatecompaniesInput | string[]
    relatedTopics?: ProblemUpdaterelatedTopicsInput | string[]
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    dislikes?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    askedByFaang?: BoolFieldUpdateOperationsInput | boolean
    similarQuestions?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProblemUpdatetagsInput | string[]
    companyTags?: ProblemUpdatecompanyTagsInput | string[]
    examples?: NullableJsonNullValueInput | InputJsonValue
    constraints?: NullableStringFieldUpdateOperationsInput | string | null
    hints?: NullableStringFieldUpdateOperationsInput | string | null
    editorial?: NullableStringFieldUpdateOperationsInput | string | null
    testcases?: NullableJsonNullValueInput | InputJsonValue
    codeSnippets?: NullableJsonNullValueInput | InputJsonValue
    referenceSolutions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutSubmissionNestedInput
    testCases?: TestCaseResultUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testCases?: TestCaseResultUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSolvedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutSolvedByNestedInput
  }

  export type ProblemSolvedUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSolvedUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemPlaylistUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemPlaylistUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscussionUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutDiscussionsNestedInput
    parent?: DiscussionUpdateOneWithoutRepliesNestedInput
    replies?: DiscussionUpdateManyWithoutParentNestedInput
    likes?: DiscussionLikeUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problemId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: DiscussionUncheckedUpdateManyWithoutParentNestedInput
    likes?: DiscussionLikeUncheckedUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problemId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiscussionLikeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discussion?: DiscussionUpdateOneRequiredWithoutLikesNestedInput
  }

  export type DiscussionLikeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discussionId?: StringFieldUpdateOperationsInput | string
  }

  export type DiscussionLikeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discussionId?: StringFieldUpdateOperationsInput | string
  }

  export type RevisionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutRevisionNestedInput
  }

  export type RevisionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RevisionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyProblemInput = {
    id?: string
    userId: string
    sourceCode: JsonNullValueInput | InputJsonValue
    language: string
    stdin?: string | null
    stdout?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemSolvedCreateManyProblemInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemPlaylistCreateManyProblemInput = {
    id?: string
    playlistId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiscussionCreateManyProblemInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    parentId?: string | null
  }

  export type RevisionCreateManyProblemInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    testCases?: TestCaseResultUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testCases?: TestCaseResultUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateManyWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceCode?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    stdin?: NullableStringFieldUpdateOperationsInput | string | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSolvedUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSolvedProblemsNestedInput
  }

  export type ProblemSolvedUncheckedUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSolvedUncheckedUpdateManyWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemPlaylistUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlist?: PlaylistUpdateOneRequiredWithoutProblemsNestedInput
  }

  export type ProblemPlaylistUncheckedUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemPlaylistUncheckedUpdateManyWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscussionUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutDiscussionsNestedInput
    parent?: DiscussionUpdateOneWithoutRepliesNestedInput
    replies?: DiscussionUpdateManyWithoutParentNestedInput
    likes?: DiscussionLikeUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUncheckedUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: DiscussionUncheckedUpdateManyWithoutParentNestedInput
    likes?: DiscussionLikeUncheckedUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUncheckedUpdateManyWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RevisionUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRevisionNestedInput
  }

  export type RevisionUncheckedUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RevisionUncheckedUpdateManyWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCaseResultCreateManySubmissionInput = {
    id?: string
    testCase: number
    passed: boolean
    stdout?: string | null
    expected?: string | null
    stderr?: string | null
    compileOutput?: string | null
    status: string
    memory?: string | null
    time?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestCaseResultUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    testCase?: IntFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    expected?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCaseResultUncheckedUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    testCase?: IntFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    expected?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCaseResultUncheckedUpdateManyWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    testCase?: IntFieldUpdateOperationsInput | number
    passed?: BoolFieldUpdateOperationsInput | boolean
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    expected?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    compileOutput?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    memory?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemPlaylistCreateManyPlaylistInput = {
    id?: string
    problemId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemPlaylistUpdateWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutProblemsPlaylistNestedInput
  }

  export type ProblemPlaylistUncheckedUpdateWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemPlaylistUncheckedUpdateManyWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscussionCreateManyParentInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    problemId: string
    authorId: string
  }

  export type DiscussionLikeCreateManyDiscussionInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type DiscussionUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutDiscussionsNestedInput
    author?: UserUpdateOneRequiredWithoutDiscussionsNestedInput
    replies?: DiscussionUpdateManyWithoutParentNestedInput
    likes?: DiscussionLikeUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problemId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    replies?: DiscussionUncheckedUpdateManyWithoutParentNestedInput
    likes?: DiscussionLikeUncheckedUpdateManyWithoutDiscussionNestedInput
  }

  export type DiscussionUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problemId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type DiscussionLikeUpdateWithoutDiscussionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiscussionLikesNestedInput
  }

  export type DiscussionLikeUncheckedUpdateWithoutDiscussionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type DiscussionLikeUncheckedUpdateManyWithoutDiscussionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}